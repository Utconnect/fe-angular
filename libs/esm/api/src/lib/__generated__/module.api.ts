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
import { Observable } from 'rxjs';
import {
  CreateModuleData,
  ESMApplicationModulesCommandsCreateCreateCommand,
  ESMApplicationModulesCommandsImportImportCommand,
  ImportExaminationModuleData,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(ESM_CONFIG);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Module
   * @name CreateModule
   * @request POST:/Module
   * @response `200` `CreateModuleData` Success
   */
  createModule(
    data: ESMApplicationModulesCommandsCreateCreateCommand
  ): Observable<CreateModuleData> {
    return this.http.post<CreateModuleData>(this.url + `/Module`, data);
  }

  /**
   * No description
   *
   * @tags Module
   * @name ImportExaminationModule
   * @request POST:/Module/import
   * @response `200` `ImportExaminationModuleData` Success
   */
  importExaminationModule(
    data: ESMApplicationModulesCommandsImportImportCommand
  ): Observable<ImportExaminationModuleData> {
    return this.http.post<ImportExaminationModuleData>(
      this.url + `/Module/import`,
      data
    );
  }
}

export class ModuleApiAction {
  createModuleSuccessful = createAction(
    '[Module/API] createModule Successful',
    props<{ data: CreateModuleData['data'] }>()
  );

  createModuleFailed = createAction('[Module/API] createModule Failed');

  importExaminationModuleSuccessful = createAction(
    '[Module/API] importExaminationModule Successful',
    props<{ data: ImportExaminationModuleData['data'] }>()
  );

  importExaminationModuleFailed = createAction(
    '[Module/API] importExaminationModule Failed'
  );
}
