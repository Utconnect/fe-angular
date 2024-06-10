import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SimpleModel } from '@utconnect/types';
import { Observable } from 'rxjs';
import { ResponseModel, SimpleTeacher } from '../models';
import { getEnv } from './partial';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  getByDepartment(
    department: string,
  ): Observable<ResponseModel<SimpleModel[]>> {
    return this.http.get<ResponseModel<SimpleModel[]>>(
      this.url + `teachers?id_department[equal]=${department}`,
    );
  }

  getTeacherInfo(teacherId: string): Observable<ResponseModel<SimpleTeacher>> {
    return this.http.get<ResponseModel<SimpleTeacher>>(
      this.url + `teachers/${teacherId}`,
    );
  }
}
