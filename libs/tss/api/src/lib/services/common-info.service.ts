import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SimpleMapModel, SimpleModel } from '@utconnect/types';
import { map, Observable, of } from 'rxjs';
import { AcademicData, ResponseModel } from '../models';
import { getEnv } from './partial';

@Injectable({
  providedIn: 'root',
})
export class CommonInfoService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  getAcademicYear(): Observable<AcademicData[]> {
    return this.http
      .get<ResponseModel<AcademicData[]>>(this.url + 'training-types')
      .pipe(map(({ data }) => data));
  }

  getCurrentTerm(): Observable<string> {
    return of('2024 - 2025');
  }

  getFaculties(): Observable<
    ResponseModel<SimpleMapModel<string, SimpleModel[]>[]>
  > {
    return this.http.get<
      ResponseModel<SimpleMapModel<string, SimpleModel[]>[]>
    >(this.url + 'v1/faculties/with-departments');
  }

  getRooms(): Observable<string[]> {
    return this.http
      .get<ResponseModel<string[]>>(this.url + 'rooms')
      .pipe(map(({ data }) => data));
  }
}
