import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../core/service/data.service';
import { ResponseObject } from '../../core/model/response-object';
import { ResponseList } from '../../core/model/response-list';

import { WebResource } from './web-resource';
import { ResouceTypeEnum } from './resource-type-enum';

@Injectable()
export class WebResourceService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/common/webresource', http, tokenExtractor);
  }

  getWebResourceTypeList(): Observable<ResponseList<ResouceTypeEnum>> {
    const url = `${this.API_URL}/resourcetype`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
   };

   return this.http.get<ResponseList<ResouceTypeEnum>>(url, options).pipe(
  );
  }

  getList(params?: any): Observable<ResponseList<WebResource>> {
    const url = `${this.API_URL}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<WebResource>>(url, options).pipe(
      //catchError((err) => Observable.throw(err))
    );
  }

  get(id: string): Observable<ResponseObject<WebResource>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<WebResource>>(url, options).pipe(
      //catchError((err) => Observable.throw(err))
    );
  }

  getDupCheck(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URL}/${id}/check`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<boolean>>(url, options).pipe(
      //catchError((err) => Observable.throw(err))
    );
  }

  save(program: WebResource): Observable<ResponseObject<WebResource>> {
    const url = `${this.API_URL}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<WebResource>>(url, program, options).pipe(
      //catchError((err) => Observable.throw(err))
    );
  }

  delete(id: string): Observable<ResponseObject<WebResource>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<WebResource>>(url, options)
              .pipe(
                //catchError((err) => Observable.throw(err))
              );
  }

}
