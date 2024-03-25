/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { createAction, props } from '@ngrx/store';
import { ObjectHelper } from '@utconnect/helpers';
import { Observable } from 'rxjs';
import { getEnv } from '../partial';
import {
  ESMApplicationTeachersCommandsUpdateUpdateRequest,
  GetTeachersData,
  GetTeachersQuery,
  SearchData,
  SearchQuery,
  UpdateInfoData,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Teacher
   * @name GetTeachers
   * @request GET:/Teacher
   * @response `200` `GetTeachersData` Success
   */
  getTeachers(query: GetTeachersQuery): Observable<GetTeachersData> {
    return this.http.get<GetTeachersData>(this.url + `/Teacher`, {
      params: ObjectHelper.removeUndefinedField(query),
    });
  }

  /**
   * No description
   *
   * @tags Teacher
   * @name Search
   * @request GET:/Teacher/search
   * @response `200` `SearchData` Success
   */
  search(query: SearchQuery): Observable<SearchData> {
    return this.http.get<SearchData>(this.url + `/Teacher/search`, {
      params: ObjectHelper.removeUndefinedField(query),
    });
  }

  /**
   * No description
   *
   * @tags Teacher
   * @name UpdateInfo
   * @request PUT:/Teacher/{teacherId}
   * @response `200` `UpdateInfoData` Success
   */
  updateInfo(
    teacherId: string,
    data: ESMApplicationTeachersCommandsUpdateUpdateRequest,
  ): Observable<UpdateInfoData> {
    return this.http.put<UpdateInfoData>(
      this.url + `/Teacher/${teacherId}`,
      data,
    );
  }
}

export class TeacherApiAction {
  getTeachersSuccessful = createAction(
    '[Teacher/API] getTeachers Successful',
    props<{ data: GetTeachersData['data'] }>(),
  );

  getTeachersFailed = createAction('[Teacher/API] getTeachers Failed');

  searchSuccessful = createAction(
    '[Teacher/API] search Successful',
    props<{ data: SearchData['data'] }>(),
  );

  searchFailed = createAction('[Teacher/API] search Failed');

  updateInfoSuccessful = createAction(
    '[Teacher/API] updateInfo Successful',
    props<{ data: UpdateInfoData['data'] }>(),
  );

  updateInfoFailed = createAction('[Teacher/API] updateInfo Failed');
}
