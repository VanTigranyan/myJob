import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(
    private api: ApiService,
  ) {}

  /**
   * @desc Request for getting all job postings of the employer.
   * @param params - request optional params.
   * @param id - the company id of the user
   */
  public getAllJobs(params: object, id: number | string): Observable<any> {
    return this.api.request(
      'get',
      `/api/jobs/company/${id}/admin`,
      null,
      false,
      { params },
    );
  }

  /**
   * @desc Request for getting all the information for the given job.
   * @param {string | number } id - the id of the job.
   */
  public getJobById(id: number | string): Observable<any> {
    return this.api.request(
      'get',
      `/api/jobs/${id}`,
      null,
      true,
    );
  }

  /**
   * @desc Request for refreshing job posting.
   * @param {string | number } id - the id of the job.
   */
  public refreshJob(id: string | number): Observable<any> {
    return this.api.request(
      'put',
      `/api/jobs/${id}/refresh`,
      null,
      true,
    );
  }

  /**
   * @desc Request for toggling the job posting activation status.
   * @param {string | number } id - the id of the job.
   * @returns { Observable<text | boolean }
   */
  public toggleActivation(id: string | number): Observable<any> {
    return this.api.request(
      'put',
      `/api/jobs/${id}/toggle_activation`,
      null,
      false,
      { responseType: 'text' },
    );
  }

  /**
   * @desc Request for searching jobs by the given key string.
   * @param { object } params - request options params. I.e. query params.
   * @param id - the company id of the user.
   */
  public searchJob(params: object, id: string | number): Observable<any> {
    return this.api.request(
        'get',
        `/api/jobs/company/${id}/admin`,
        null,
        true,
        { params },
      );
  }
}
