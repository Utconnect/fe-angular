import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ObjectHelper } from '@utconnect/helpers';
import { map, Observable } from 'rxjs';
import {
  ExamScheduleModel,
  Note,
  ResponseModel,
  UpdateExamModel,
} from '../models';
import { getEnv } from './partial';

const parseExamSchedule = (
  response: ResponseModel<ExamScheduleModel[]>,
): ResponseModel<ExamScheduleModel[]> => ({
  ...response,
  data: response.data.map((x) => {
    return ExamScheduleModel.parse(
      ObjectHelper.parseDateProperties(x, ['startAt', 'endAt']),
    );
  }),
});

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  getExamSchedule(
    idTeacher: string,
    date: string,
  ): Observable<ResponseModel<ExamScheduleModel[]>> {
    return this.http
      .get<ResponseModel<ExamScheduleModel[]>>(
        this.url + `v1/teachers/${idTeacher}/module-classes/exam-schedules`,
        { params: { 'date[between]': date } },
      )
      .pipe(map(parseExamSchedule));
  }

  getDepartmentExamSchedule(
    department: string,
    dateRangeOrSession: string,
    paramType: 'dateRange' | 'session' = 'dateRange',
  ): Observable<ResponseModel<ExamScheduleModel[]>> {
    const params: Record<string, string> =
      paramType === 'dateRange'
        ? {
            'date[between]': dateRangeOrSession,
            // For assign exam page, we must sort by date
            'start_at[sort]': 'asc',
          }
        : { study_session: dateRangeOrSession };

    return this.http
      .get<ResponseModel<ExamScheduleModel[]>>(
        this.url +
          `v1/departments/${department}/modules/module-classes/exam-schedules`,
        { params },
      )
      .pipe(map(parseExamSchedule));
  }

  update(idExamSchedule: number, body: UpdateExamModel): Observable<void> {
    return this.http.patch<void>(
      this.url + `v1/exam-schedules/${idExamSchedule}`,
      ObjectHelper.toSnakeCase(body),
    );
  }

  updateProctor(idExam: number, proctorsId: string[]): Observable<void> {
    return this.http.post<void>(
      this.url + `v1/exam-schedules/${idExam}/proctors`,
      proctorsId,
    );
  }

  updateExamNote(
    idTeacher: string,
    idExamSchedule: number,
    body: Note,
  ): Observable<void> {
    return this.http.patch<void>(
      this.url + `v1/teachers/${idTeacher}/exam-schedules/${idExamSchedule}`,
      body,
    );
  }
}
