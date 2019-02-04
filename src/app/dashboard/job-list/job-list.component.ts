import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { filter, takeWhile } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { JobsService } from '../../services/jobs.service';
import { ApplicationsService } from '../../services/applications.service';
import { User } from '../../models/user.model';
import { AuthActionTypes } from '../../store/types/auth.types';
import { JobsState } from '../../store/reducers/jobs.reducer';
import { JobActionTypes } from '../../store/types/jobs.types';
import * as authSelectors from '../../store/selectors/auth.selectors';
import * as jobSelectors from '../../store/selectors/jobs.selectors';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit, OnDestroy {
  private user: User;
  private componentIsActive: boolean;
  // Array of all jobs.
  public allJobs;
  // Should we show active jobs or deactivated?
  public isActive;
  // Provide the pending state of activation or deactivation process.
  public activationIsPending$ = this.store.select(jobSelectors.getActivationPending);
  // Provide the pending state of getting jobs info.
  public jobIsPending = false;
  // How much job we have in total.
  public totalJob$ = this.store.select(jobSelectors.getTotalCount);
  // Default count of jobs in a page.
  public count = 10;
  // Pagiantor instance from template.
  @ViewChild('paginator') paginator;

  /**
   * @desc Function that called every time we want to navigate between active and deactivated jobs.
   * Changes title of the page. Changes the state of showing active or deactivated jobs. Navigates to a route based on activation state.
   * Goes to first page by paginator if before changing we was not on the first page.
   */
  public changeActivation(): void {
    const route = this.isActive ? 'deactive' : 'active';
    this.title.setTitle(`Jobs List | ${!this.isActive ? 'Active Jobs' : 'Deactivated Jobs'}`);
    this.isActive = !this.isActive;
    this.router.navigate(['employers', 'job-list'], { queryParams: { page: route } });
    this.paginator.firstPage();
  }

  /**
   * @desc Checks the length of jobs array.
   */
  public checkLength() {
    if (this.allJobs) {
      return this.allJobs.filter(j => j.is_active === this.isActive).length;
    }
  }

  /**
   * @param id - the id of the job.
   * @param i - index of the job want to change.
   * @desc Changes the activation status of given job.
   */
  public toggleJobActivation(id, i) {
    this.store.dispatch(
      {
        type: JobActionTypes.ToggleJobActivation,
        payload: { id, idx: i },
      },
    );
  }

  /**
   * @desc Function called for getting jobs array.
   * @param is_active - represent current state of the page, whether we should show active or deactivated jobs.
   */
  public getJobs(is_active: boolean) {
    let params = new HttpParams();
    params = params.append('filter[is_active]', is_active.toString());
    this.store.dispatch({
      type: JobActionTypes.LoadJobs,
      payload: { params, id: this.user.company.id },
    });
  }

  /**
   * @desc Function called when we want to search some jobs by a key.
   * @param str - key for searching.
   */
  public findJob(str: string) {
    let params = new HttpParams();
    params = params.append('count', '10');
    params = params.append('filter[is_active]', this.isActive.toString());
    params = params.append('filter[title]', str);
    params = params.append('page', '1');
    params = params.append('sorting[title]', 'asc');
    this.store.dispatch({
      type: JobActionTypes.LoadJobs,
      payload: { params, id: this.user.company.id },
    });
  }

  /**
   * @desc Checks if we should let the user to refresh the job posting.
   * @param date - the date when the job was refreshed the last time.
   */
  public checkRefresh(date) {
    return this.appl.checkRefreshDate(date);
  }

  /**
   * @desc Function called any time we use pagination function, whether we change count or change the page.
   * @param e - event which is provided by Angular Material paginator.
   */
  public onPage(e) {
    let params = new HttpParams();
    params = params.append('count', e.pageSize.toString());
    params = params.append('filter[is_active]', this.isActive.toString());
    params = params.append('page', (e.pageIndex + 1).toString());
    params = params.append('sorting[title]', 'asc');
    this.store.dispatch({
      type: JobActionTypes.LoadJobs,
      payload: { params, id: this.user.company.id },
    });
  }

  /**
   * @desc Reshfreshing call for given job.
   * @param id - id of the job we want to refresh.
   */
  public refreshJob(id) {
    this.jobs.refreshJob(id)
      .subscribe(
        (res) => {
          this.getJobs(this.isActive);
        },
        error => console.log(error),
      );
  }

  /**
   * @desc Function called when we Sign out. It deletes ser credentials from localStorage, and set auth status to false.
   */
  public onLogout() {
    this.store.dispatch({
      type: AuthActionTypes.Logout,
    });
  }
  constructor(
    private router: Router,
    private jobs: JobsService,
    private appl: ApplicationsService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private title: Title,
    private store: Store<JobsState>,
    ) {
    this.translate.setDefaultLang('mm');
    this.translate.use('en');
  }

  ngOnInit() {
    this.componentIsActive = true;
    // Take User info from store
    this.store.pipe(
      select(authSelectors.getUserInfo),
      takeWhile(() => this.componentIsActive),
    ).subscribe(user => this.user = user);
    // Take all jobs from store
    this.store.pipe(
      select(jobSelectors.getAllJobs),
      takeWhile(() => this.componentIsActive),
    ).subscribe(jobs => this.allJobs = jobs);
    // Take jobs pending status
    this.store.pipe(
      select(jobSelectors.getLoadStatus),
      takeWhile(() => this.componentIsActive),
    ).subscribe(status => this.jobIsPending = status);

    this.title.setTitle('Jobs List');
    // Checking if we don't have query param which provides which page we should show. If so, we redirect to active jobs page.
    if (!this.route.snapshot.queryParams['page']) {
      this.router.navigate(['employers', 'job-list'], { queryParams: { page: 'active' } });
    }
    // Subscribing to changes of query params of the route.
    this.route.queryParams
      .pipe(filter(param => param['page']))
      .subscribe(
        (param) => {
          this.isActive = param['page'] === 'active';
          this.getJobs(this.isActive);
        },
        (error) => {
          console.log(error);
        },
      );
  }

  ngOnDestroy(): void {
    this.componentIsActive = false;
  }

}
