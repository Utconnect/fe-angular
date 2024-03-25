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
import { Observable } from 'rxjs';
import { getEnv } from '../partial';
import {
  CreateFacultyData,
  ESMApplicationFacultiesCommandsCreateCreateCommand,
  ESMApplicationFacultiesCommandsUpdateUpdateRequest,
  GetAllFacultyData,
  GetUserData,
  UpdateFacultyData,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Faculty
   * @name GetAllFaculty
   * @request GET:/Faculty
   * @response `200` `GetAllFacultyData` Success
   */
  getAllFaculty(): Observable<GetAllFacultyData> {
    return this.http.get<GetAllFacultyData>(this.url + `/Faculty`);
  }

  /**
   * No description
   *
   * @tags Faculty
   * @name CreateFaculty
   * @request POST:/Faculty
   * @response `200` `CreateFacultyData` Success
   */
  createFaculty(
    data: ESMApplicationFacultiesCommandsCreateCreateCommand,
  ): Observable<CreateFacultyData> {
    return this.http.post<CreateFacultyData>(this.url + `/Faculty`, data);
  }

  /**
   * No description
   *
   * @tags Faculty
   * @name UpdateFaculty
   * @request PUT:/Faculty/{facultyId}
   * @response `200` `UpdateFacultyData` Success
   */
  updateFaculty(
    facultyId: string,
    data: ESMApplicationFacultiesCommandsUpdateUpdateRequest,
  ): Observable<UpdateFacultyData> {
    return this.http.put<UpdateFacultyData>(
      this.url + `/Faculty/${facultyId}`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Faculty
   * @name GetUser
   * @request GET:/Faculty/{facultyId}/users
   * @response `200` `GetUserData` Success
   */
  getUser(facultyId: string): Observable<GetUserData> {
    return this.http.get<GetUserData>(this.url + `/Faculty/${facultyId}/users`);
  }
}

export class FacultyApiAction {
  getAllFacultySuccessful = createAction(
    '[Faculty/API] getAllFaculty Successful',
    props<{ data: GetAllFacultyData['data'] }>(),
  );

  getAllFacultyFailed = createAction('[Faculty/API] getAllFaculty Failed');

  createFacultySuccessful = createAction(
    '[Faculty/API] createFaculty Successful',
    props<{ data: CreateFacultyData['data'] }>(),
  );

  createFacultyFailed = createAction('[Faculty/API] createFaculty Failed');

  updateFacultySuccessful = createAction(
    '[Faculty/API] updateFaculty Successful',
    props<{ data: UpdateFacultyData['data'] }>(),
  );

  updateFacultyFailed = createAction('[Faculty/API] updateFaculty Failed');

  getUserSuccessful = createAction(
    '[Faculty/API] getUser Successful',
    props<{ data: GetUserData['data'] }>(),
  );

  getUserFailed = createAction('[Faculty/API] getUser Failed');
}
