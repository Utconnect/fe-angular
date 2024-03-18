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
import { ESM_CONFIG } from '@esm/config';
import { createAction, props } from '@ngrx/store';
import { ObjectHelper } from '@utconnect/helpers';
import { AuthService } from '@utconnect/services';
import { Observable } from 'rxjs';
import {
  ChangePasswordData,
  ESMApplicationAuthCommandsChangePasswordChangePasswordCommand,
  ESMApplicationAuthCommandsLoginLoginCommand,
  GetMySummaryInfoData,
  LoginData,
  ResetPasswordData,
  ResetPasswordQuery,
} from './data-contracts';

@Injectable()
export class EsmAuthService implements AuthService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(ESM_CONFIG);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Auth
   * @name ChangePassword
   * @request PATCH:/Auth/change-password
   * @response `200` `ChangePasswordData` Success
   */
  changePassword(
    data: ESMApplicationAuthCommandsChangePasswordChangePasswordCommand
  ): Observable<ChangePasswordData> {
    return this.http.patch<ChangePasswordData>(
      this.url + `/Auth/change-password`,
      data
    );
  }

  /**
   * No description
   *
   * @tags Auth
   * @name Login
   * @request POST:/Auth/login
   * @response `200` `LoginData` Success
   */
  login(
    data: ESMApplicationAuthCommandsLoginLoginCommand
  ): Observable<LoginData> {
    return this.http.post<LoginData>(this.url + `/Auth/login`, data);
  }

  /**
   * No description
   *
   * @tags Auth
   * @name GetMySummaryInfo
   * @request GET:/Auth/me
   * @response `200` `GetMySummaryInfoData` Success
   */
  getMySummaryInfo(): Observable<GetMySummaryInfoData> {
    return this.http.get<GetMySummaryInfoData>(this.url + `/Auth/me`);
  }

  /**
   * No description
   *
   * @tags Auth
   * @name ResetPassword
   * @request PATCH:/Auth/reset-password
   * @response `200` `ResetPasswordData` Success
   */
  resetPassword(query: ResetPasswordQuery): Observable<ResetPasswordData> {
    return this.http.patch<ResetPasswordData>(
      this.url + `/Auth/reset-password`,
      {},
      { params: ObjectHelper.removeUndefinedField(query) }
    );
  }
}

export class AuthApiAction {
  changePasswordSuccessful = createAction(
    '[Auth/API] changePassword Successful',
    props<{ data: ChangePasswordData['data'] }>()
  );

  changePasswordFailed = createAction('[Auth/API] changePassword Failed');

  loginSuccessful = createAction(
    '[Auth/API] login Successful',
    props<{ data: LoginData['data'] }>()
  );

  loginFailed = createAction('[Auth/API] login Failed');

  getMySummaryInfoSuccessful = createAction(
    '[Auth/API] getMySummaryInfo Successful',
    props<{ data: GetMySummaryInfoData['data'] }>()
  );

  getMySummaryInfoFailed = createAction('[Auth/API] getMySummaryInfo Failed');

  resetPasswordSuccessful = createAction(
    '[Auth/API] resetPassword Successful',
    props<{ data: ResetPasswordData['data'] }>()
  );

  resetPasswordFailed = createAction('[Auth/API] resetPassword Failed');
}
