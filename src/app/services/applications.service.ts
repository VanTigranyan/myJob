import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(private api: ApiService) {
  }

  /**
   * @desc Request for getting all applications list for the given job.
   * @param { number | string } jobId - the id of the job posting.
   * @param { string } type - the type of application, i.e. cv_downloaded aka viewed.
   */
  public getApplications(jobId: number | string , type: string): Observable<any> {
    return this.api.request(
      'get',
      `/api/jobs/${jobId}/applications/${type}`,
      null,
      true,
    );
  }

  /**
   * @desc Request for changing rating of the applicant.
   * @param { number | string } id - the id of the applicant.
   * @param { number | string } r - rating count for the applicant. Can be in range 1 - 5.
   */
  public setRating(id: number | string , r: number | string): Observable<any> {
    return this.api.request(
      'put',
      `/api/applications/rateApplication/${id}/${r}`,
      null,
      true,
    );
  }

  /**
   * @desc Request for creating a note for the application.
   * @param { number | string } id - the id of the applicant.
   * @param { string } note - the note text.
   */
  public sendNote(id: string | number, note: string): Observable<any> {
    return this.api.request(
      'post',
      '/api/applications/writeNote',
      { noteFormData: { note, appId: id } },
      true,
    );
  }

  /**
   * @desc Request for changing the application current status. I.e - first_interview or shortlist.
   * @param { number | string } applId - the id of the applicant.
   * @param { string } status - the status of the applicant.
   */
  public changeApplicationStatus(applId: string | number, status: string): Observable<any> {
    return this.api.request(
      'put',
      `/api/applications/changeApplicationStatus/${applId}/${status}`,
      null,
      true,
    );
  }

  /**
   * @desc Function that checks whether we can refresh the job posting or not.
   * @param { string } ISOdate - the date string in ISO format.
   */
  public checkRefreshDate(ISOdate: string): boolean {
    const jobDate = new Date(ISOdate).getDate();
    const now = new Date().getDate();
    let diff = jobDate - now ;
    if (diff < 0) { diff = -diff; }
    return diff > 5;
  }

  /**
   * @desc Function that encode the Job posting title, for using in the Preview page link.
   * @param { string } text - the title of the job.
   * @param { string | number } jobId - the id of the job.
   */
  public encodeJobTitle(text: string, jobId: string | number): string {
    // Encode the title using RegEx.
    let slug = text.replace(/(,\s)|(\s-\s)|\s|:/g, '-');
    // If we will use it in a link, string should be completely in lowercase.
    slug = slug.toLowerCase();
    // return a link.
    return `https://app.myjobs.com.mm/en/job/${slug}/${jobId}?preview=true`;
  }

}
