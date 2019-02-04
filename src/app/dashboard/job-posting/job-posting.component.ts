import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MyErrorStateMatcher } from './error-state-matcher';
import { options } from './editor-options';
import { AuthService } from '../../services/auth.service';
import { PostingService } from '../../services/posting.service';
import { ApplicationsService } from '../../services/applications.service';
import { JobsService } from '../../services/jobs.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.scss'],
})
export class JobPostingComponent implements OnInit {
  // Editor configuration
  public config = options;
  // Current posting mode, can be ''New' 'Edit' or 'Clone'
  public mode;
  // Observable which watch for mode changes.
  public modeChanger = new Subject;
  // Employer info object.
  public employer;
  // Salaries info for options
  public salaries;
  // Job info object
  public jobInfo;
  // Job Id , gotten from route
  public jobId;
  // Regions info for options
  public regions;
  // Townships info for options
  public townships;
  // Company info
  public company;
  // Filtered townships for chosen region
  public regionTownships;
  // Categories info for options
  public categories = [];
  // Current selected region , by default it is Yangon
  public selectedRegion;
  // Is app in pending process of a job info
  public jobIsPending = false;
  // Error matcher
  public matcher = new MyErrorStateMatcher();
  // Form controls
  titleFormControl = new FormControl('', [
    Validators.required,
  ]);
  refFormControl = new FormControl('', [
    Validators.required,
  ]);
  editorFormControl = new FormControl('', [
    Validators.required,
  ]);
  jobCategoryControl = new FormControl('', [
    Validators.required,
  ]);
  addCategoryControl = new FormControl('');
  jobRegionControl = new FormControl(1, [Validators.required]);
  townshipControl = new FormControl('');
  salaryRangeFrom = new FormControl('');
  salaryRangeTo = new FormControl('');
  salaryDescControl = new FormControl('');
  question1Control = new FormControl('');
  question2Control = new FormControl('');
  question3Control = new FormControl('');

  /**
   * @desc Submit method pass over controls array and checks validity.
   * If any error have got, it opens toaster with error message.
   * If not - submits creating, updating or editing of a job based on current mode.
   */
  public onSubmit() {
    // Creating controls array
    const controlsArray = [
      this.titleFormControl,
      this.refFormControl,
      this.editorFormControl,
      this.jobCategoryControl,
      this.addCategoryControl,
      this.jobRegionControl,
      this.townshipControl,
      this.salaryRangeFrom,
      this.salaryRangeTo,
      this.salaryDescControl,
      this.question1Control,
      this.question2Control,
      this.question3Control,
    ];
    // Checking if any control has an error.
    const formHasError = controlsArray.some(c => c.hasError('required'));
    // If some controls have any error throw an error message with toaster. Else continue submitting the posting.
    if (formHasError) {
      controlsArray.map((c) => {
        if (c.hasError('required')) {
          c.markAsTouched();
          this.alert.error('Check fields which must be filled!');
        }
      });
    } else {
      // Creating obj for submitting. We will fill it with values then.
      const submitObj = {};
      // Initialize angular DOM parser for getting description from Editor HTML content.
      const parser = new DOMParser();
      const element = parser.parseFromString(this.editorFormControl.value, 'text/html').body.innerText;
      // Creating an array for main and additional categories.
      const categories = [];
      const category1 = this.categories.find(c => c.id === this.jobCategoryControl.value);
      categories.push(category1);
      // initialize reguion by filtering with id in  Region info array.
      const region = this.regions.find(r => r.id === this.jobRegionControl.value);
      // initialize salaries range start by filtering with id in  Salaries info array.
      const salFrom = this.salaries.find(s => s.id === this.salaryRangeFrom.value);
      // initialize salaries range finish by filtering with id in  Salaries info array.
      const salTo = this.salaries.find(s => s.id === this.salaryRangeTo.value);
      // If we have an additional category, then push it to categories array.
      if (this.addCategoryControl.value) {
        const category2 = this.categories.find(c => c.id === this.addCategoryControl.value);
        categories.push(category2);
      }
      // Checking if we have any question and append it to our submit object.
      if (this.question1Control.value) {
        submitObj['job_question_1'] = this.question1Control.value;
      }
      if (this.question2Control.value) {
        submitObj['job_question_2'] = this.question2Control.value;
      }
      if (this.question3Control.value) {
        submitObj['job_question_3'] = this.question3Control.value;
      }
      // Checking if we have salary description then append it to the submit object.
      if (this.salaryDescControl.value) {
        submitObj['salary_description'] = this.salaryDescControl.value;
      }
      // Checking if we have selected township, then append it to the submit object.
      if (this.townshipControl.value) {
        submitObj['township'] = this.townships.find(town => town.id === this.townshipControl.value);
      }
      // Append all gotten values to the submit object.
      submitObj['description'] = element;
      submitObj['html_description'] = this.editorFormControl.value;
      submitObj['categories'] = categories;
      submitObj['company'] = this.company;
      submitObj['reference'] = this.refFormControl.value;
      submitObj['regions'] = [region];
      submitObj['salary_range_from'] = salFrom;
      submitObj['salary_range_to'] = salTo;
      submitObj['title'] = this.titleFormControl.value;
      // We have to check if we are in 'Edit' mode, if so we have to pass also Job Id,
      // so the server can recognize whether to clone or to edit the job.
      if (this.mode === 'edit') {
        submitObj['id'] = this.jobId;
      }
      // Finally we submit our values object.
      this.post.createJobPosting(submitObj)
        .subscribe(
          (res) => {
            this.jobInfo = res;
            this.jobId = res.id;
            this.modeChanger.next('edit');
            this.alert.success('Your Job Posting was successfully saved!');
          },
          (error) => {
            this.alert.error('Something went wrong, please try later!');
          },
        );
    }
  }

  /**
   * @desc Function called every time selected region changes.
   */
  public onRegionChange() {
    this.regionTownships = this.townships.filter(t => t.region_id === this.jobRegionControl.value);
    this.selectedRegion = this.regions.find(r => r.id === this.jobRegionControl.value).name;
    this.townshipControl.setValue(null);
  }
  public onTownChange() {
    console.log(this.townshipControl.value);
  }
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private post: PostingService,
    public snackBar: MatSnackBar,
    private appl: ApplicationsService,
    private jobs: JobsService,
    private title: Title,
    private alert: NotificationService,
  ) {}

  ngOnInit() {
    // Subscribing to Mode changes.
    this.modeChanger
      .subscribe(
        (m) => {
          // if mode is 'create', we need to generate new ref
          // and change page title.
          if (m === 'create') {
            this.mode = 'create';
            this.refFormControl.setValue(this.post.createRef());
            this.title.setTitle('Create new job posting');
          } else if (m === 'clone' || m === 'edit') {
            if (m === 'clone') {
              this.title.setTitle('Clone job posting');
            } else {
              this.title.setTitle('Edit job posting');
            }
            // If we don't have the job info, we should get it from server.
            if (!this.jobInfo) {
              this.jobIsPending = true;
              this.jobs.getJobById(this.jobId)
                .subscribe(
                  (job) => {
                    m === 'clone' ? this.mode = 'clone' : this.mode = 'edit';
                    this.jobInfo = job;
                    // Setting to all controls default values from gotten job info.
                    this.titleFormControl.setValue(this.jobInfo.title);
                    this.refFormControl.setValue(this.jobInfo.reference);
                    this.editorFormControl.setValue(this.jobInfo.html_description);
                    this.jobCategoryControl.setValue(this.jobInfo.categories[0].id);
                    this.addCategoryControl.setValue(this.jobInfo.categories[1] ? this.jobInfo.categories[1].id : null);
                    this.jobRegionControl.setValue(this.jobInfo.regions[0].id);
                    this.townshipControl.setValue(this.jobInfo.township ? this.jobInfo.township.id : null);
                    this.salaryRangeFrom.setValue(this.jobInfo.salary_range_from);
                    this.salaryRangeTo.setValue(this.jobInfo.salaryRangeTo);
                    this.salaryDescControl.setValue(this.jobInfo.salary_description);
                    this.question1Control.setValue(this.jobInfo.job_question_1);
                    this.question2Control.setValue(this.jobInfo.job_question_2);
                    this.question3Control.setValue(this.jobInfo.job_question_3);
                    this.jobIsPending = false;
                  },
                  (error) => {
                    this.alert.error(error.error.message || error.message || error);
                    this.jobIsPending = false;
                  },
                );
            } else {
              m === 'clone' ? this.mode = 'clone' : this.mode = 'edit';
            }
          }
        },
        error => this.alert.error(error.error.message || error.message || error),
      );
    // Subscribing to route param changes
    this.route.params
      .pipe(
        filter(
          data => data['param'],
        ),
      )
      .subscribe(
        (data) => {
          // When we get new param we should pass new value to ModeChanger observable.
          if (data.param === 'new') {
            this.modeChanger.next('create');
          } else if (+data.param) {
            this.jobId = +data.param;
            if (this.route.snapshot.queryParams['clone']) {
              this.modeChanger.next('clone');
            } else {
              this.modeChanger.next('edit');
              this.jobId = +data.param;
            }
          }
        },
        error => this.alert.error(error.error.message || error.message || error),
      );
    // On initialization we have to check if the user is authenticated.
    this.auth.current()
      .subscribe(
        (res) => {
          this.employer = res;
          // If user is authenticated we can initialize new job.
          this.post.initJob(this.employer.company.id)
            .subscribe(
              (i) => {
                this.company = i.company;
              },
              error => this.alert.error(error.e2rror.message || error.message || error),
            );
          // Get Salaries info
          this.post.getSalaries()
            .subscribe(
              sal => this.salaries = sal,
              error => this.alert.error(error.error.message || error.message || error),
            );
          // Get Regions info
          this.post.getRegions()
            .subscribe(
              (reg) => {
                this.regions = reg;
                this.selectedRegion = this.regions.find(r => r.id === this.jobRegionControl.value).name;
              },
              error => this.alert.error(error.error.message || error.message || error),
            );
          // Get townships info
          this.post.getTownships()
            .subscribe(
              (town) => {
                this.townships = town;
                this.regionTownships = this.townships.filter(t => t.region_id === this.jobRegionControl.value);
              },
              error => this.alert.error(error.error.message || error.message || error),
            );
          // Get categories info
          this.post.getCategories()
            .subscribe(
              (ctg) => {
                this.categories = ctg;
              },
              error => this.alert.error(error.error.message || error.message || error),
            );
        },
        error => this.alert.error(error.error.message || error.message || error),
      );
  }

}
