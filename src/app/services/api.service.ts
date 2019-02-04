import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    ) {}

  private token: string = localStorage.getItem('token');

  /**
   * @desc Function that dinamically creates headers for http request.
   * @param  {any | null } body - the body of the request. If none was provided -
   *                              there is no need to create headers for body.
   */
  private getHeaders(body: any = null): HttpHeaders {
    const headersObj = {};
    if (body && !(body instanceof FormData)) {
      headersObj['Content-Type'] = 'application/json';
    }
    // if (this.token) {
    headersObj['Authorization'] = `Bearer ${this.token}`;
    // }
    return new HttpHeaders(headersObj);
  }

  /**
   * @desc Function that dynamically creates a request, using given parameters.
   * @param { string } type - the type of request, can be any of http requests - i.e. 'post'
   * @param { string } url - the URL endpoint of the request.
   * @param { object | null } body - the body of the request.
   * @param { boolean } useParams - Represents whether should be used cookies for auth.
   * @param { object } reqOptions - Optional parameter, which is used for adding some extra options for
   *                               request. I.e.  - response type.
   * @returns { Observable<any> } - observable containing request.
   */
  request(type: string, url: string, body: object | null = null, useParams: boolean, reqOptions?: object): Observable<any> {
    // endpoint
    const to = url;
    // Creating an object which contains all request options.
    let options = {
      observe: 'response',
      headers: this.getHeaders(body),
      // responseType: ['json', 'text'],
    };

    // Creating an array, which contains all the arguments for the HttpClient request.
    const argsArray: any[] = [to];
    // If we should be authenticated, append to options the option - WithCredentials.
    if (useParams) {
      options['withCredentials'] = true;
    }
    // If we have extra request options
    if (reqOptions) {
      options = { ...options, ...reqOptions };
    }

    // Check if the request is 'get' or 'delete'
    // If so - we don't need to create headers.
    // if not - we should create headers.
    if (type === 'get' || type === 'delete') {
      argsArray.push(options);
    } else {
      let data = null;
      if (body) {
        // Check if body is instance of angular FormData.
        // if not - we should it convert to JSON format.
        data = body instanceof FormData ? body : JSON.stringify(body);
      }
      // Push data into ArgsArray.
      argsArray.push(data);
    }
    // Push all options into ArgsArray.
    argsArray.push(options);
    // Return the request Observable. For sending we should subscribe to it.
    return this.http[type](...argsArray).pipe(
      // Map response , if we have a body, return it.
      // If not - return the response entirely.
      map((res: HttpResponse<any>) => {
        if (res.body) {
          return res.body;
        }
        return res;
      }),
    );
  }
}
