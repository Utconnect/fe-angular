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
  AssignInvigilatorsNumberToFacultyData,
  AssignInvigilatorsNumberToFacultyPayload,
  ESMApplicationGroupsCommandsUpdateTemporaryNameToTeacherUpdateTemporaryNameToTeacherRequest,
  UpdateTemporaryNameToTeacherData,
} from './data-contracts';

@Injectable()
export class GroupService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Group
   * @name UpdateTemporaryNameToTeacher
   * @request PATCH:/Group/{groupId}
   * @response `200` `UpdateTemporaryNameToTeacherData` Success
   */
  updateTemporaryNameToTeacher(
    groupId: string,
    data: ESMApplicationGroupsCommandsUpdateTemporaryNameToTeacherUpdateTemporaryNameToTeacherRequest,
  ): Observable<UpdateTemporaryNameToTeacherData> {
    return this.http.patch<UpdateTemporaryNameToTeacherData>(
      this.url + `/Group/${groupId}`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Group
   * @name AssignInvigilatorsNumberToFaculty
   * @request PATCH:/Group/{groupId}/{facultyId}
   * @response `200` `AssignInvigilatorsNumberToFacultyData` Success
   */
  assignInvigilatorsNumberToFaculty(
    groupId: string,
    facultyId: string,
    data: AssignInvigilatorsNumberToFacultyPayload,
  ): Observable<AssignInvigilatorsNumberToFacultyData> {
    return this.http.patch<AssignInvigilatorsNumberToFacultyData>(
      this.url + `/Group/${groupId}/${facultyId}`,
      data,
    );
  }
}

export class GroupApiAction {
  updateTemporaryNameToTeacherSuccessful = createAction(
    '[Group/API] updateTemporaryNameToTeacher Successful',
    props<{ data: UpdateTemporaryNameToTeacherData['data'] }>(),
  );

  updateTemporaryNameToTeacherFailed = createAction(
    '[Group/API] updateTemporaryNameToTeacher Failed',
  );

  assignInvigilatorsNumberToFacultySuccessful = createAction(
    '[Group/API] assignInvigilatorsNumberToFaculty Successful',
    props<{ data: AssignInvigilatorsNumberToFacultyData['data'] }>(),
  );

  assignInvigilatorsNumberToFacultyFailed = createAction(
    '[Group/API] assignInvigilatorsNumberToFaculty Failed',
  );
}
