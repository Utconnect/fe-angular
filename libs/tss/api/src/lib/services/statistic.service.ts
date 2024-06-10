import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TuiDayRange } from '@taiga-ui/cdk';
import { DateHelper } from '@utconnect/helpers';
import { Observable } from 'rxjs';
import { ChangeSchedule, ResponseModel } from '../models';
import { getEnv } from './partial';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  getDepartment(
    departmentId: string,
    date: string,
  ): Observable<ResponseModel<ChangeSchedule[]>> {
    return this.http.get<ResponseModel<ChangeSchedule[]>>(
      this.url + `departments/${departmentId}/fixed-schedules`,
      {
        params: {
          date,
          'status%5Bin%5D': '300,301,302,500,501',
          'old_date[sort]': 'asc',
          'old_shift[sort]': 'asc',
          'old_id_room[sort]': 'asc',
        },
      },
    );
  }

  getPersonal(
    range: TuiDayRange,
    teacherId: string,
  ): Observable<ResponseModel<ChangeSchedule[]>> {
    const from = DateHelper.format(range.from);
    const to = DateHelper.format(range.to);

    return this.http.get<ResponseModel<ChangeSchedule[]>>(
      this.url +
        `teachers/${teacherId}/fixed-schedules?date=${from},${to}&old_date[sort]=asc&old_shift[sort]=asc&old_id_room[sort]=asc`,
    );
  }
}
