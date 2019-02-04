import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';

import { ApplicationsService } from '../../services/applications.service';
import { JobsService } from '../../services/jobs.service';

// store
import { Store, select } from '@ngrx/store';
import * as applSelectors from '../../store/selectors/applications.selectors';
import { ApplicationTypes } from '../../store/types/applications.types';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit, OnDestroy {
  private componentIsActive: boolean;
  // Object which contains the job info.
  public job;
  // Job id taken from params of the route.
  public jobId;
  // Transitional variable which contains the rating of the applicant we want to change.
  public rating;
  // Represents the state of changing rating of the applicant we want.
  public rateIsPending = this.store.select(applSelectors.getRatePanding);
  // Applicants list of the given job.
  public applications;
  // Represents what type of applications we should show.
  public currentPage;
  // Represents the state of page, when we pending to server for taking job data.
  public pageIsPending;
  // Shows the index of applicant field, which we want to add a note to.
  public isEditable: number;
  // Shows the state of pending the note submitting process.
  public noteIsPending = this.store.select(applSelectors.getNotePending);
  // Form control which provides the content of current editing note.
  public notes = new FormControl('');
  // Observable which provides what type of applicants we should show. It takes info from the query params.
  public app_status = new Subject();
  // Helping instance of Array prototypes, for using in template.
  public Arr = Array;

  /**
   * @desc Getting application of the given job for the current page
   */
  public getApplications() {
    this.store.dispatch({
      type: ApplicationTypes.GetApplicants,
      payload: { jobId: this.jobId, type: this.currentPage },
    });
  }

  /**
   * @desc Function for toggling textarea for editing given application note.
   * @param i - the index of application
   */
  public onEdit(i) {
    this.store.dispatch({
      type: ApplicationTypes.EditNote,
      payload: i,
    });
  }

  /**
   * @desc Function called for saving note on the server
   * @param note - text of the note
   * @param id - id of the applicant
   * @param i - index of the application
   */
  public onEditSave(note, id, i) {
    // If value didn't change do nothing and break function execution.
    if (this.isEditable === i) {
      if (note === this.notes.value) {
        this.store.dispatch({
          type: ApplicationTypes.EditNote,
          payload: null,
        });
        return;
      }
      // Submit the note
      this.store.dispatch({
        type: ApplicationTypes.SendNote,
        payload: { id, idx: i, note: this.notes.value },
      });
    }
  }

  /**
   * @desc Function which cancels job note editing, and reset the value of the control.
   * @param note - note text
   */
  public onEditCancel(note) {
    if (note && note !== this.notes.value) {
      this.notes.setValue(null);
    }
    this.store.dispatch({
      type: ApplicationTypes.EditNote,
      payload: null,
    });
  }

  /**
   * @desc Function which calls for toggling rating count.
   * @param r - rating count which we want to set.
   * @param id - id of the applicant.
   * @param i - index of the application.
   */
  public toggleRating(r, id, i) {
    this.store.dispatch({
      type: ApplicationTypes.ChangeRating,
      payload: { r, id, i },
    });
  }

  /**
   * @desc Function which executes every time we want to change the status of the applicant.
   * @param id - Applicant's id.
   * @param status - The status we want to apply.
   */
  public changeStatus(id, status) {
    this.store.dispatch({
      type: ApplicationTypes.ChangeStatus,
      payload: { id, status, jobId: this.jobId, page: this.currentPage },
    });
  }

  /**
   * @desc Function which executes for refreshing job posting.
   * @param id - the id of the job.
   */
  public refreshJob(id) {
    this.jobs.refreshJob(id)
      .subscribe(
        (res) => {
          this.getApplications();
        },
        error => console.log(error),
      );
  }

  /**
   * @desc Checks if the user can refresh the job posting.
   * @param date - the date when job posting was refreshed the last time.
   */
  public checkRefreshDate(date) {
    return this.appl.checkRefreshDate(date);
  }

  /**
   * @desc Encodes the title of the job for using in link of the job preview.
   * @param text - Job title.
   * @param id - the id of the job.
   */
  public encodeJobTitle(text, id) {
    return this.appl.encodeJobTitle(text, id);
  }

  /**
   * @desc Toggles the activation status of the job.
   * @param id - the id of the job.
   */
  public toggleActivation(id) {
    this.jobs.toggleActivation(id)
      .subscribe(
        (res) => {
          this.getApplications();
        },
        (error) => {
          console.log(error);
        },
      );
  }
  constructor(
    private route: ActivatedRoute,
    private appl: ApplicationsService,
    private jobs: JobsService,
    private title: Title,
    private store: Store<any>,
    ) { }
  ngOnInit() {
    this.componentIsActive = true;

    // subscribe to store entities
    this.store.pipe(
      select(applSelectors.getApplications),
      takeWhile(() => this.componentIsActive),
    ).subscribe(appl => this.applications = appl);

    this.store.pipe(
      select(applSelectors.getJobInfo),
      takeWhile(() => this.componentIsActive),
    ).subscribe(job => this.job = job);

    this.store.pipe(
      select(applSelectors.getPagePanding),
      takeWhile(() => this.componentIsActive),
    ).subscribe(status => this.pageIsPending = status);

    this.store.pipe(
      select(applSelectors.getErrorMessage),
      takeWhile(() => this.componentIsActive),
    );

    this.store.pipe(
      select(applSelectors.getEditableNote),
      takeWhile(() => this.componentIsActive),
    ).subscribe(i => this.isEditable = i);

    this.title.setTitle('Appliaction List');
    // Getting the id of the job from route params.
    this.jobId = this.route.snapshot.params['id'];
    // Subscribing to changes of the app_status route param.
    this.app_status.subscribe(
      (param: string) => {
        this.currentPage = param;
        this.getApplications();
        this.title.setTitle(`Application list | ${param.charAt(0).toUpperCase() + param.slice(1)}`);
      },
      error => console.log(error),
    );
    // Subscribing to route params, and filtering only app_status queryParam.
    this.route.queryParams
      .pipe(
        filter(param => param['app-status']),
      )
      .subscribe(
        (param) => {
          this.app_status.next(param['app-status']);
        },
        error => console.log(error),
      );
  }

  ngOnDestroy() {
    this.componentIsActive = false;
  }

}
