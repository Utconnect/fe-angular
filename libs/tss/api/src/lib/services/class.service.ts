import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleClass, ResponseModel, SearchAssignSchedule } from '../models';
import { getEnv } from './partial';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  getDepartmentModuleClass(
    department: string,
    params: SearchAssignSchedule,
  ): Observable<ResponseModel<ModuleClass[]>> {
    return this.http.get<ResponseModel<ModuleClass[]>>(
      this.url + `departments/${department}/module-classes`,
      { params },
    );
  }

  assign(idTeacher: string, idClass: string[]): Observable<void> {
    return this.http.put<void>(this.url + 'module-classes/update', {
      ids: idClass,
      id_teacher: idTeacher,
    });
  }

  unassign(idClass: string[]): Observable<void> {
    return this.http.put<void>(this.url + 'module-classes/update', {
      ids: idClass,
      id_teacher: null,
    });
  }
}
