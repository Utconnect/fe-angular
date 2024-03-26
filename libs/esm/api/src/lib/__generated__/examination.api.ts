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
  AssignInvigilatorNumerateOfShiftToFacultyData,
  AssignInvigilatorNumerateOfShiftToFacultyPayload,
  AssignInvigilatorsToShiftsData,
  AssignInvigilatorsToShiftsPayload,
  AutoAssignTeachersToGroupsData,
  AutoAssignTeachersToShiftData,
  CalculateInvigilatorNumerateOfShiftForEachFacultyData,
  ChangeStatusData,
  CreateExaminationData,
  ESMApplicationExaminationsCommandsChangeStatusChangeStatusRequest,
  ESMApplicationExaminationsCommandsCreateCreateCommand,
  ESMApplicationExaminationsCommandsUpdateUpdateParams,
  GetAllGroupsData,
  GetAllShiftsData,
  GetAvailableInvigilatorsInShiftGroupData,
  GetEventsData,
  GetGroupsByFacultyIdData,
  GetHandoverDataData,
  GetRelatedData,
  GetRelatedQuery,
  GetShiftsData,
  GetStatisticData,
  GetSummaryData,
  GetTemporaryDataData,
  GetTemporaryDataQuery,
  ImportExaminationData,
  ImportExaminationPayload,
  UpdateExaminationData,
  UpdateExamsCountData,
  UpdateExamsCountPayload,
  UpdateShiftExaminationData,
  UpdateShiftExaminationPayload,
  UpdateTeacherAssignmentData,
  UpdateTeacherAssignmentPayload,
  UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupData,
  UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupPayload,
} from './data-contracts';

@Injectable()
export class ExaminationService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Examination
   * @name CreateExamination
   * @request POST:/Examination
   * @response `200` `CreateExaminationData` Success
   */
  createExamination(
    data: ESMApplicationExaminationsCommandsCreateCreateCommand,
  ): Observable<CreateExaminationData> {
    return this.http.post<CreateExaminationData>(
      this.url + `/Examination`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name GetRelated
   * @request GET:/Examination/related
   * @response `200` `GetRelatedData` Success
   */
  getRelated(query: GetRelatedQuery): Observable<GetRelatedData> {
    return this.http.get<GetRelatedData>(this.url + `/Examination/related`, {
      params: ObjectHelper.removeUndefinedField(query),
    });
  }

  /**
   * No description
   *
   * @tags Examination
   * @name GetAllShifts
   * @request GET:/Examination/{examinationId}
   * @response `200` `GetAllShiftsData` Success
   */
  getAllShifts(examinationId: string): Observable<GetAllShiftsData> {
    return this.http.get<GetAllShiftsData>(
      this.url + `/Examination/${examinationId}`,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name ImportExamination
   * @request POST:/Examination/{examinationId}
   * @response `200` `ImportExaminationData` Success
   */
  importExamination(
    examinationId: string,
    data: ImportExaminationPayload,
  ): Observable<ImportExaminationData> {
    const formData = new FormData();

    for (const property in data) {
      const d = data[property as keyof ImportExaminationPayload];
      if (Array.isArray(d)) {
        d.forEach((element) => {
          formData.append(property, element);
        });
      } else if (d !== undefined) {
        formData.append(property, d);
      }
    }

    return this.http.post<ImportExaminationData>(
      this.url + `/Examination/${examinationId}`,
      formData,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name UpdateExamination
   * @request PATCH:/Examination/{examinationId}
   * @response `200` `UpdateExaminationData` Success
   */
  updateExamination(
    examinationId: string,
    data: ESMApplicationExaminationsCommandsUpdateUpdateParams,
  ): Observable<UpdateExaminationData> {
    return this.http.patch<UpdateExaminationData>(
      this.url + `/Examination/${examinationId}`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name GetEvents
   * @request GET:/Examination/{examinationId}/events
   * @response `200` `GetEventsData` Success
   */
  getEvents(examinationId: string): Observable<GetEventsData> {
    return this.http.get<GetEventsData>(
      this.url + `/Examination/${examinationId}/events`,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name GetHandoverData
   * @request GET:/Examination/{examinationId}/handover
   * @response `200` `GetHandoverDataData` Success
   */
  getHandoverData(examinationId: string): Observable<GetHandoverDataData> {
    return this.http.get<GetHandoverDataData>(
      this.url + `/Examination/${examinationId}/handover`,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name GetShifts
   * @request GET:/Examination/{examinationId}/shift
   * @response `200` `GetShiftsData` Success
   */
  getShifts(examinationId: string): Observable<GetShiftsData> {
    return this.http.get<GetShiftsData>(
      this.url + `/Examination/${examinationId}/shift`,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name AssignInvigilatorsToShifts
   * @request PATCH:/Examination/{examinationId}/shift
   * @response `200` `AssignInvigilatorsToShiftsData` Success
   */
  assignInvigilatorsToShifts(
    examinationId: string,
    data: AssignInvigilatorsToShiftsPayload,
  ): Observable<AssignInvigilatorsToShiftsData> {
    return this.http.patch<AssignInvigilatorsToShiftsData>(
      this.url + `/Examination/${examinationId}/shift`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name UpdateShiftExamination
   * @request PATCH:/Examination/{examinationId}/shift/{shiftId}
   * @deprecated
   * @response `200` `UpdateShiftExaminationData` Success
   */
  updateShiftExamination(
    examinationId: string,
    shiftId: string,
    data: UpdateShiftExaminationPayload,
  ): Observable<UpdateShiftExaminationData> {
    return this.http.patch<UpdateShiftExaminationData>(
      this.url + `/Examination/${examinationId}/shift/${shiftId}`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name AutoAssignTeachersToShift
   * @request POST:/Examination/{examinationId}/shift/calculate
   * @response `200` `AutoAssignTeachersToShiftData` Success
   */
  autoAssignTeachersToShift(
    examinationId: string,
  ): Observable<AutoAssignTeachersToShiftData> {
    return this.http.post<AutoAssignTeachersToShiftData>(
      this.url + `/Examination/${examinationId}/shift/calculate`,
      {},
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name ChangeStatus
   * @request POST:/Examination/{examinationId}/status
   * @response `200` `ChangeStatusData` Success
   */
  changeStatus(
    examinationId: string,
    data: ESMApplicationExaminationsCommandsChangeStatusChangeStatusRequest,
  ): Observable<ChangeStatusData> {
    return this.http.post<ChangeStatusData>(
      this.url + `/Examination/${examinationId}/status`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name UpdateExamsCount
   * @request PATCH:/Examination/{examinationId}/exams-number
   * @response `200` `UpdateExamsCountData` Success
   */
  updateExamsCount(
    examinationId: string,
    data: UpdateExamsCountPayload,
  ): Observable<UpdateExamsCountData> {
    return this.http.patch<UpdateExamsCountData>(
      this.url + `/Examination/${examinationId}/exams-number`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name GetGroupsByFacultyId
   * @request GET:/Examination/{examinationId}/faculty/{facultyId}/group
   * @response `200` `GetGroupsByFacultyIdData` Success
   */
  getGroupsByFacultyId(
    examinationId: string,
    facultyId: string,
  ): Observable<GetGroupsByFacultyIdData> {
    return this.http.get<GetGroupsByFacultyIdData>(
      this.url + `/Examination/${examinationId}/faculty/${facultyId}/group`,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name UpdateTeacherAssignment
   * @request POST:/Examination/{examinationId}/faculty/{facultyId}/group
   * @response `200` `UpdateTeacherAssignmentData` Success
   */
  updateTeacherAssignment(
    examinationId: string,
    facultyId: string,
    data: UpdateTeacherAssignmentPayload,
  ): Observable<UpdateTeacherAssignmentData> {
    return this.http.post<UpdateTeacherAssignmentData>(
      this.url + `/Examination/${examinationId}/faculty/${facultyId}/group`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name AutoAssignTeachersToGroups
   * @request POST:/Examination/{examinationId}/faculty/{facultyId}/group/calculate
   * @response `200` `AutoAssignTeachersToGroupsData` Success
   */
  autoAssignTeachersToGroups(
    examinationId: string,
    facultyId: string,
  ): Observable<AutoAssignTeachersToGroupsData> {
    return this.http.post<AutoAssignTeachersToGroupsData>(
      this.url +
        `/Examination/${examinationId}/faculty/${facultyId}/group/calculate`,
      {},
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name GetAllGroups
   * @request GET:/Examination/{examinationId}/group
   * @response `200` `GetAllGroupsData` Success
   */
  getAllGroups(examinationId: string): Observable<GetAllGroupsData> {
    return this.http.get<GetAllGroupsData>(
      this.url + `/Examination/${examinationId}/group`,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name CalculateInvigilatorNumerateOfShiftForEachFaculty
   * @request POST:/Examination/{examinationId}/group/calculate
   * @response `200` `CalculateInvigilatorNumerateOfShiftForEachFacultyData` Success
   */
  calculateInvigilatorNumerateOfShiftForEachFaculty(
    examinationId: string,
  ): Observable<CalculateInvigilatorNumerateOfShiftForEachFacultyData> {
    return this.http.post<CalculateInvigilatorNumerateOfShiftForEachFacultyData>(
      this.url + `/Examination/${examinationId}/group/calculate`,
      {},
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name UpdateTemporaryTeacherToUserIdInDepartmentShiftGroup
   * @request POST:/Examination/{examinationId}/group/{groupId}/department/{departmentId}
   * @deprecated
   * @response `200` `UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupData` Success
   */
  updateTemporaryTeacherToUserIdInDepartmentShiftGroup(
    examinationId: string,
    groupId: string,
    departmentId: string,
    data: UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupPayload,
  ): Observable<UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupData> {
    return this.http.post<UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupData>(
      this.url +
        `/Examination/${examinationId}/group/${groupId}/department/${departmentId}`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name AssignInvigilatorNumerateOfShiftToFaculty
   * @request POST:/Examination/{examinationId}/group/{groupId}/{facultyId}
   * @deprecated
   * @response `200` `AssignInvigilatorNumerateOfShiftToFacultyData` Success
   */
  assignInvigilatorNumerateOfShiftToFaculty(
    examinationId: string,
    groupId: string,
    facultyId: string,
    data: AssignInvigilatorNumerateOfShiftToFacultyPayload,
  ): Observable<AssignInvigilatorNumerateOfShiftToFacultyData> {
    return this.http.post<AssignInvigilatorNumerateOfShiftToFacultyData>(
      this.url + `/Examination/${examinationId}/group/${groupId}/${facultyId}`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name GetAvailableInvigilatorsInShiftGroup
   * @request GET:/Examination/{examinationId}/invigilator
   * @response `200` `GetAvailableInvigilatorsInShiftGroupData` Success
   */
  getAvailableInvigilatorsInShiftGroup(
    examinationId: string,
  ): Observable<GetAvailableInvigilatorsInShiftGroupData> {
    return this.http.get<GetAvailableInvigilatorsInShiftGroupData>(
      this.url + `/Examination/${examinationId}/invigilator`,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name GetStatistic
   * @request GET:/Examination/{examinationId}/statistic
   * @response `200` `GetStatisticData` Success
   */
  getStatistic(examinationId: string): Observable<GetStatisticData> {
    return this.http.get<GetStatisticData>(
      this.url + `/Examination/${examinationId}/statistic`,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name GetSummary
   * @request GET:/Examination/{examinationId}/summary
   * @response `200` `GetSummaryData` Success
   */
  getSummary(examinationId: string): Observable<GetSummaryData> {
    return this.http.get<GetSummaryData>(
      this.url + `/Examination/${examinationId}/summary`,
    );
  }

  /**
   * No description
   *
   * @tags Examination
   * @name GetTemporaryData
   * @request GET:/Examination/{examinationId}/temporary
   * @response `200` `GetTemporaryDataData` Success
   */
  getTemporaryData({
    examinationId,
    ...query
  }: GetTemporaryDataQuery): Observable<GetTemporaryDataData> {
    return this.http.get<GetTemporaryDataData>(
      this.url + `/Examination/${examinationId}/temporary`,
      { params: ObjectHelper.removeUndefinedField(query) },
    );
  }
}

export class ExaminationApiAction {
  createExaminationSuccessful = createAction(
    '[Examination/API] createExamination Successful',
    props<{ data: CreateExaminationData['data'] }>(),
  );

  createExaminationFailed = createAction(
    '[Examination/API] createExamination Failed',
  );

  getRelatedSuccessful = createAction(
    '[Examination/API] getRelated Successful',
    props<{ data: GetRelatedData['data'] }>(),
  );

  getRelatedFailed = createAction('[Examination/API] getRelated Failed');

  getAllShiftsSuccessful = createAction(
    '[Examination/API] getAllShifts Successful',
    props<{ data: GetAllShiftsData['data'] }>(),
  );

  getAllShiftsFailed = createAction('[Examination/API] getAllShifts Failed');

  importExaminationSuccessful = createAction(
    '[Examination/API] importExamination Successful',
    props<{ data: ImportExaminationData['data'] }>(),
  );

  importExaminationFailed = createAction(
    '[Examination/API] importExamination Failed',
  );

  updateExaminationSuccessful = createAction(
    '[Examination/API] updateExamination Successful',
    props<{ data: UpdateExaminationData['data'] }>(),
  );

  updateExaminationFailed = createAction(
    '[Examination/API] updateExamination Failed',
  );

  getEventsSuccessful = createAction(
    '[Examination/API] getEvents Successful',
    props<{ data: GetEventsData['data'] }>(),
  );

  getEventsFailed = createAction('[Examination/API] getEvents Failed');

  getHandoverDataSuccessful = createAction(
    '[Examination/API] getHandoverData Successful',
    props<{ data: GetHandoverDataData['data'] }>(),
  );

  getHandoverDataFailed = createAction(
    '[Examination/API] getHandoverData Failed',
  );

  getShiftsSuccessful = createAction(
    '[Examination/API] getShifts Successful',
    props<{ data: GetShiftsData['data'] }>(),
  );

  getShiftsFailed = createAction('[Examination/API] getShifts Failed');

  assignInvigilatorsToShiftsSuccessful = createAction(
    '[Examination/API] assignInvigilatorsToShifts Successful',
    props<{ data: AssignInvigilatorsToShiftsData['data'] }>(),
  );

  assignInvigilatorsToShiftsFailed = createAction(
    '[Examination/API] assignInvigilatorsToShifts Failed',
  );

  updateShiftExaminationSuccessful = createAction(
    '[Examination/API] updateShiftExamination Successful',
    props<{ data: UpdateShiftExaminationData['data'] }>(),
  );

  updateShiftExaminationFailed = createAction(
    '[Examination/API] updateShiftExamination Failed',
  );

  autoAssignTeachersToShiftSuccessful = createAction(
    '[Examination/API] autoAssignTeachersToShift Successful',
    props<{ data: AutoAssignTeachersToShiftData['data'] }>(),
  );

  autoAssignTeachersToShiftFailed = createAction(
    '[Examination/API] autoAssignTeachersToShift Failed',
  );

  changeStatusSuccessful = createAction(
    '[Examination/API] changeStatus Successful',
    props<{ data: ChangeStatusData['data'] }>(),
  );

  changeStatusFailed = createAction('[Examination/API] changeStatus Failed');

  updateExamsCountSuccessful = createAction(
    '[Examination/API] updateExamsCount Successful',
    props<{ data: UpdateExamsCountData['data'] }>(),
  );

  updateExamsCountFailed = createAction(
    '[Examination/API] updateExamsCount Failed',
  );

  getGroupsByFacultyIdSuccessful = createAction(
    '[Examination/API] getGroupsByFacultyId Successful',
    props<{ data: GetGroupsByFacultyIdData['data'] }>(),
  );

  getGroupsByFacultyIdFailed = createAction(
    '[Examination/API] getGroupsByFacultyId Failed',
  );

  updateTeacherAssignmentSuccessful = createAction(
    '[Examination/API] updateTeacherAssignment Successful',
    props<{ data: UpdateTeacherAssignmentData['data'] }>(),
  );

  updateTeacherAssignmentFailed = createAction(
    '[Examination/API] updateTeacherAssignment Failed',
  );

  autoAssignTeachersToGroupsSuccessful = createAction(
    '[Examination/API] autoAssignTeachersToGroups Successful',
    props<{ data: AutoAssignTeachersToGroupsData['data'] }>(),
  );

  autoAssignTeachersToGroupsFailed = createAction(
    '[Examination/API] autoAssignTeachersToGroups Failed',
  );

  getAllGroupsSuccessful = createAction(
    '[Examination/API] getAllGroups Successful',
    props<{ data: GetAllGroupsData['data'] }>(),
  );

  getAllGroupsFailed = createAction('[Examination/API] getAllGroups Failed');

  calculateInvigilatorNumerateOfShiftForEachFacultySuccessful = createAction(
    '[Examination/API] calculateInvigilatorNumerateOfShiftForEachFaculty Successful',
    props<{
      data: CalculateInvigilatorNumerateOfShiftForEachFacultyData['data'];
    }>(),
  );

  calculateInvigilatorNumerateOfShiftForEachFacultyFailed = createAction(
    '[Examination/API] calculateInvigilatorNumerateOfShiftForEachFaculty Failed',
  );

  updateTemporaryTeacherToUserIdInDepartmentShiftGroupSuccessful = createAction(
    '[Examination/API] updateTemporaryTeacherToUserIdInDepartmentShiftGroup Successful',
    props<{
      data: UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupData['data'];
    }>(),
  );

  updateTemporaryTeacherToUserIdInDepartmentShiftGroupFailed = createAction(
    '[Examination/API] updateTemporaryTeacherToUserIdInDepartmentShiftGroup Failed',
  );

  assignInvigilatorNumerateOfShiftToFacultySuccessful = createAction(
    '[Examination/API] assignInvigilatorNumerateOfShiftToFaculty Successful',
    props<{ data: AssignInvigilatorNumerateOfShiftToFacultyData['data'] }>(),
  );

  assignInvigilatorNumerateOfShiftToFacultyFailed = createAction(
    '[Examination/API] assignInvigilatorNumerateOfShiftToFaculty Failed',
  );

  getAvailableInvigilatorsInShiftGroupSuccessful = createAction(
    '[Examination/API] getAvailableInvigilatorsInShiftGroup Successful',
    props<{ data: GetAvailableInvigilatorsInShiftGroupData['data'] }>(),
  );

  getAvailableInvigilatorsInShiftGroupFailed = createAction(
    '[Examination/API] getAvailableInvigilatorsInShiftGroup Failed',
  );

  getStatisticSuccessful = createAction(
    '[Examination/API] getStatistic Successful',
    props<{ data: GetStatisticData['data'] }>(),
  );

  getStatisticFailed = createAction('[Examination/API] getStatistic Failed');

  getSummarySuccessful = createAction(
    '[Examination/API] getSummary Successful',
    props<{ data: GetSummaryData['data'] }>(),
  );

  getSummaryFailed = createAction('[Examination/API] getSummary Failed');

  getTemporaryDataSuccessful = createAction(
    '[Examination/API] getTemporaryData Successful',
    props<{ data: GetTemporaryDataData['data'] }>(),
  );

  getTemporaryDataFailed = createAction(
    '[Examination/API] getTemporaryData Failed',
  );
}
