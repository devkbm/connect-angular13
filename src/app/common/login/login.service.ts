import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { DataService } from '../../core/service/data.service';

import { UserToken } from './user-token.model';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { GlobalProperty } from 'src/app/global-property';
import { ResponseList } from '../../core/model/response-list';
import { ResponseObject } from '../../core/model/response-object';

@Injectable()
export class LoginService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/common/user/login', http, tokenExtractor);
  }

  /**
   * @description 로그인 한다.
   * @paramTag 아이디
   * @paramTag 비밀번호
   * @returnType {UserToken} Token 정보
   */
  doLogin(organizationCode: string, staffNo: string, pwd: string): Observable<UserToken> {
    const body = {organizationCode: organizationCode, staffNo: staffNo, password: pwd};
    const options = {
      headers: this.getHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .post<UserToken>(this.API_URL, body, options).pipe(
        // tap((userToken: UserToken) => console.log(userToken.token) ),
        // catchError((err) => Observable.throw(err))
      );
  }

  private doJsonLogin(id: string, pwd: string): Observable<UserToken> {
    const body = {username: id, password: pwd};
    const options = {
      headers: this.getHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .post<UserToken>(this.API_URL, body, options).pipe(
        // tap((userToken: UserToken) => console.log(userToken.token) ),
        // catchError((err) => Observable.throw(err))
      );
  }

  private doFormLogin(id: string, pwd: string): Observable<UserToken> {
    const body = {username: id, password: pwd};
    const options = {}; /* {
      headers: this.getHttpHeaders()
    };*/


    let form = new FormData();
    form.set('username', id);
    form.set('password', pwd);

    return this.http
      .post<UserToken>(this.API_URL, form, options).pipe(
        // tap((userToken: UserToken) => console.log(userToken.token) ),
        // catchError((err) => Observable.throw(err))
      );
  }

  getAuthToken(): Observable<UserToken> {
    const url = 'http://localhost:8090/api/user/auth';

    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<UserToken>(url, options).pipe(
      catchError(this.handleError<UserToken>('getAuthToken', undefined))
    );
  }

  /*
  isValid(): Observable<boolean> {
    const url = 'http://localhost:8090/api/user/auth';

    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<boolean>(url, options).pipe(
      catchError(this.handleError<boolean>('isValid', undefined))
    );
  }
  */
}
