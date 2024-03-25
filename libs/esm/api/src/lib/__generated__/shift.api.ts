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
  ESMApplicationShiftsCommandsUpdateUpdateRequest,
  UpdateShiftData,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Shift
   * @name UpdateShift
   * @request PATCH:/Shift/{shiftId}
   * @response `200` `UpdateShiftData` Success
   */
  updateShift(
    shiftId: string,
    data: ESMApplicationShiftsCommandsUpdateUpdateRequest,
  ): Observable<UpdateShiftData> {
    return this.http.patch<UpdateShiftData>(
      this.url + `/Shift/${shiftId}`,
      data,
    );
  }
}

export class ShiftApiAction {
  updateShiftSuccessful = createAction(
    '[Shift/API] updateShift Successful',
    props<{ data: UpdateShiftData['data'] }>(),
  );

  updateShiftFailed = createAction('[Shift/API] updateShift Failed');
}
