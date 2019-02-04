import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { RoleTypes } from '../constants/role.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
  ) {}

  // property that shows whether the user is signed in.
  private isLoggedIn = false;
  // The user info object.
  private user: User | null;
  // Base Url
  private BASE_URL = 'http://localhost:9000';

  public getToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * @desc Request for logging in and creating a session.
   * @param { string } username - the username of the user.
   * @param { string } password - the password of the user.
   */
  public login (username: string, password: string): Observable<any> {
    const url = `/api/users/login-v2`;
    const body = {
      username,
      password,
    };
    return this.api.request(
      'post',
      url,
      body,
      false,
    );
  }

  /**
   * @desc Request for logging out and finishing the session.
   */
  public logout(): Observable<any> {
    return this.http.post('/api/users/logout', {}, { withCredentials: true, responseType: 'text' });
  }

  /**
   * @desc Request for checking current session and getting user info.
   * @returns { Observable<any> } - observable which contains the request.
   */
  public current (): Observable<any> {
    return this.api.request('get', 'api/users/current/', null, true);
  }
}
