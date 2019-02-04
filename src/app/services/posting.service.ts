import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostingService {
  constructor(private api: ApiService) {}

  /**
   * @desc Function for creating reference string.
   * @returns { string }
   */
  public createRef(): string {
    return `MJ${(new Date()).getTime()}`;
  }

  /**
   * @desc Request for getting townships info.
   */
  public getTownships(): Observable<any> {
    return this.api.request(
      'get',
      '/api/townships',
      null,
      true,
    );
  }

  /**
   * @desc Request for getting salaries info.
   */
  public getSalaries(): Observable<any> {
    return this.api.request(
      'get',
      '/static/salary',
      null,
      true,
    );
  }

  /**
   * @desc Request for initializingn a job posting.
   * @param { string | number } id - the id of the job posting.
   */
  public initJob(id): Observable<any> {
    const params = new HttpParams()
      .set('companyId', id);
    return this.api.request(
      'get',
      '/api/jobs/init-job',
      null,
      true,
      params,
    );
  }

  /**
   * @desc Request for getting Categories info.
   */
  public getCategories(): Observable<any> {
    return this.api.request(
      'get',
      '/static/categories',
      null,
      true,
    );
  }

  /**
   * @desc Request for getting regions info.
   */
  getRegions(): Observable<any> {
    return this.api.request(
      'get',
      '/static/regions',
      null,
      true,
    );
  }

  /**
   * @desc Request for creating, updating or cloning a job posting
   * @param { object } data - the object which contains all the required information of the job posting.
   */
  createJobPosting(data: object): Observable<any> {
    return this.api.request(
      'post',
      '/api/jobs',
      data,
      true,
    );
  }
}
