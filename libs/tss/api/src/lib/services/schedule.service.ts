import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ObjectHelper } from '@utconnect/helpers';
import { map, Observable } from 'rxjs';
import {
  AcceptChangeScheduleRequestPayload,
  ChangeSchedule,
  ChangeScheduleSearch,
  DenyChangeScheduleRequestPayload,
  IntendTimeChangeScheduleRequestPayload,
  Note,
  PaginationResponseModel,
  RequestChangeSchedulePayload,
  RequestIntendChangeSchedulePayload,
  ResponseModel,
  SearchSchedule,
  SetRoomChangeScheduleRequestPayload,
  StatusModel,
  StudyScheduleModel,
} from '../models';
import { getEnv } from './partial';

const parseStudyScheduleModel = (
  response: ResponseModel<StudyScheduleModel[]>,
): ResponseModel<StudyScheduleModel[]> => ({
  ...response,
  data: response.data.map((x) =>
    StudyScheduleModel.parse(ObjectHelper.parseDateProperties(x, ['date'])),
  ),
});

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  getSchedule(
    idTeacher: string,
    searchSchedule: SearchSchedule,
  ): Observable<ResponseModel<StudyScheduleModel[]>> {
    let params = new HttpParams().set('date[between]', searchSchedule.date);
    if (searchSchedule.shift) {
      params = params.set('shift[in]', searchSchedule.shift);
    }

    return this.http
      .get<ResponseModel<StudyScheduleModel[]>>(
        this.url + `teacher/${idTeacher}/schedules`,
        { params },
      )
      .pipe(map(parseStudyScheduleModel));
  }

  getDepartmentSchedule(
    department: string,
    date: string,
  ): Observable<ResponseModel<StudyScheduleModel[]>> {
    const params = { 'date[between]': date };

    return this.http
      .get<ResponseModel<StudyScheduleModel[]>>(
        this.url +
          `departments/${department}/teachers/module-classes/schedules`,
        { params },
      )
      .pipe(map(parseStudyScheduleModel));
  }

  updateStudyNote(idSchedule: number, body: Note): Observable<void> {
    return this.http.patch<void>(
      this.url + `v1/schedules/update/${idSchedule}`,
      body,
    );
  }

  requestChangeSchedule(
    body: RequestChangeSchedulePayload,
  ): Observable<ResponseModel<number>> {
    return this.http.post<ResponseModel<number>>(
      this.url + 'fixed-schedules/create',
      ObjectHelper.toSnakeCase(body),
    );
  }

  requestIntendChangeSchedule(
    body: RequestIntendChangeSchedulePayload,
  ): Observable<ResponseModel<number>> {
    return this.http.post<ResponseModel<number>>(
      this.url + 'fixed-schedules/create?type=soft',
      ObjectHelper.toSnakeCase(body),
    );
  }

  changeSchedule(
    body: RequestChangeSchedulePayload,
  ): Observable<ResponseModel<number>> {
    return this.http.post<ResponseModel<number>>(
      this.url + 'fixed-schedules/create?type=hard',
      ObjectHelper.toSnakeCase(body),
    );
  }

  getDepartmentChangeScheduleRequests(
    department: string,
    changeScheduleSearch: ChangeScheduleSearch,
  ): Observable<PaginationResponseModel<ChangeSchedule[]>> {
    let params = new HttpParams()
      .set('id[sort]', 'desc')
      .set('page', changeScheduleSearch.page);
    // .set('pagination', 20);
    if (changeScheduleSearch.status.length) {
      params = params.set('status[in]', changeScheduleSearch.status.join());
    }

    return this.http.get<PaginationResponseModel<ChangeSchedule[]>>(
      this.url + `departments/${department}/fixed-schedules`,
      { params },
    );
  }

  getPersonalChangeScheduleRequests(
    teacherId: string,
    changeScheduleSearch: ChangeScheduleSearch,
  ): Observable<PaginationResponseModel<ChangeSchedule[]>> {
    let params = new HttpParams()
      .set('id[sort]', 'desc')
      .set('page', changeScheduleSearch.page);
    // .set('pagination', 20);
    if (changeScheduleSearch.status.length) {
      params = params.set('status[in]', changeScheduleSearch.status.join());
    }

    return this.http.get<PaginationResponseModel<ChangeSchedule[]>>(
      this.url + `teachers/${teacherId}/fixed-schedules`,
      { params },
    );
  }

  getManagerChangeScheduleRequests(
    changeScheduleSearch: ChangeScheduleSearch,
  ): Observable<PaginationResponseModel<ChangeSchedule[]>> {
    let params = new HttpParams()
      .set('id[sort]', 'desc')
      .set('page', changeScheduleSearch.page);
    // .set('pagination', 20);
    if (changeScheduleSearch.status.length) {
      params = params.set('status[in]', changeScheduleSearch.status.join());
    }

    return this.http.get<PaginationResponseModel<ChangeSchedule[]>>(
      this.url + 'fixed-schedules',
      { params },
    );
  }

  acceptChangeScheduleRequests(
    id: number,
    body: AcceptChangeScheduleRequestPayload,
  ): Observable<ResponseModel<StatusModel>> {
    return this.http.patch<ResponseModel<StatusModel>>(
      this.url + `fixed-schedules/update/${id}?type=accept`,
      ObjectHelper.toSnakeCase(body),
    );
  }

  setRoomChangeScheduleRequests(
    id: number,
    body: SetRoomChangeScheduleRequestPayload,
  ): Observable<void> {
    return this.http.patch<void>(
      this.url + `fixed-schedules/update/${id}?type=set_room`,
      ObjectHelper.toSnakeCase(body),
    );
  }

  denyChangeScheduleRequests(
    id: number,
    body: DenyChangeScheduleRequestPayload,
  ): Observable<ResponseModel<StatusModel>> {
    return this.http.patch<ResponseModel<StatusModel>>(
      this.url + `fixed-schedules/update/${id}?type=deny`,
      ObjectHelper.toSnakeCase(body),
    );
  }

  cancelChangeScheduleRequests(id: number): Observable<void> {
    return this.http.patch<void>(
      this.url + `fixed-schedules/update/${id}?type=cancel`,
      {},
    );
  }

  intendTimeChangeScheduleRequests(
    id: number,
    body: IntendTimeChangeScheduleRequestPayload,
  ): Observable<void> {
    return this.http.patch<void>(
      this.url + `fixed-schedules/update/${id}?type=intend_time`,
      ObjectHelper.toSnakeCase(body),
    );
  }
}
