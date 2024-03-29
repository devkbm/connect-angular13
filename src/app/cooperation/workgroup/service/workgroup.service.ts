import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../core/service/data.service';
import { ResponseObject } from '../../../core/model/response-object';
import { ResponseList } from '../../../core/model/response-list';
import { WorkGroup } from '../model/workgroup.model';
import { WorkGroupMember } from '../model/workgroup-member.model';
import { WorkGroupSchedule } from '../model/workgroup-schedule.model';
import { GlobalProperty } from 'src/app/global-property';



@Injectable()
export class WorkGroupService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
      super('/api/grw', http, tokenExtractor);
  }

  /**
   * @description 작업그룹명단을 조회한다.
   * @param params 조회 조건 객체
   */
  public getWorkGroupList(params?: any): Observable<ResponseList<WorkGroup>> {
    const url = `${this.API_URL}/workgroup`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http
      .get<ResponseList<WorkGroup>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseList<WorkGroup>>('getWorkGroupList', undefined))
      );
  }

  /**
   * @description 내가 속한 작업그룹명단을 조회한다.
   * @param params 조회 조건 객체
   */
  public getMyWorkGroupList(): Observable<ResponseList<WorkGroup>> {
    const url = `${this.API_URL}/myworkgroup`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseList<WorkGroup>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseList<WorkGroup>>('getMyWorkGroupList', undefined))
      );
  }

  /**
   * @description 작업그룹을 조회한다.
   * @param id 작업그룹id
   */
  public getWorkGroup(id: number): Observable<ResponseObject<WorkGroup>> {
    const url = `${this.API_URL}/workgroup/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<WorkGroup>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<WorkGroup>>('getWorkGroup', undefined))
      );
  }

  /**
   * @description 작업그룹을 저장한다.
   * @param workGroup
   */
  public saveWorkGroup(workGroup: WorkGroup): Observable<ResponseObject<WorkGroup>> {
    const url = `${this.API_URL}/workgroup`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
    .post<ResponseObject<WorkGroup>>(url, workGroup, options)
    .pipe(
      catchError(this.handleError<ResponseObject<WorkGroup>>('saveWorkGroup', undefined))
    );

  }

  /**
   * @description 작업그룹을 삭제한다.
   * @param id 작업그룹 id
   */
  public deleteWorkGroup(id: number): Observable<ResponseObject<WorkGroup>> {
    const url = `${this.API_URL}/workgroup/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<WorkGroup>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<WorkGroup>>('deleteWorkGroup', undefined))
      );
  }

  public getMemberList(params?: any): Observable<ResponseList<WorkGroupMember>> {
    const url = GlobalProperty.serverUrl + `/api/common/user`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http
      .get<ResponseList<WorkGroupMember>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseList<WorkGroupMember>>('getMemberList', undefined))
      );
  }


  /**
   * @description 스케쥴을 조회한다.
   * @param id 스케쥴id
   */
  public getWorkGroupSchedule(id: number): Observable<ResponseObject<WorkGroupSchedule>> {
    const url = `${this.API_URL}/schedule/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<WorkGroupSchedule>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<WorkGroupSchedule>>('getWorkGroup', undefined))
      );
  }

  /**
   * @description 스케쥴을 저장한다.
   * @param workGroupSchedule
   */
  public saveWorkGroupSchedule(workGroupSchedule: WorkGroupSchedule): Observable<ResponseObject<WorkGroupSchedule>> {
    const url = `${this.API_URL}/schedule`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .post<ResponseObject<WorkGroupSchedule>>(url, workGroupSchedule, options)
      .pipe(
        catchError(this.handleError<ResponseObject<WorkGroupSchedule>>('saveWorkGroupSchedule', undefined))
      );
  }

  /**
   * @description 스케쥴을 삭제한다.
   * @param id 스케쥴id
   */
  public deleteWorkGroupSchedule(id: number): Observable<ResponseObject<WorkGroupSchedule>> {
    const url = `${this.API_URL}/schedule/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<WorkGroupSchedule>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<WorkGroupSchedule>>('deleteWorkGroupSchedule', undefined))
      );
  }

  /**
   * @description 작업그룹명단을 조회한다.
   * @param params 조회 조건 객체
   */
  public getWorkScheduleList(params?: any): Observable<ResponseList<WorkGroupSchedule>> {
    const url = `${this.API_URL}/schedule`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http
      .get<ResponseList<WorkGroupSchedule>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseList<WorkGroupSchedule>>('getWorkScheduleList', undefined))
      );
  }

}
