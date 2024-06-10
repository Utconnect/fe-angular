import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InterceptorCustomHeader } from '@tss/types';
import { Observable } from 'rxjs';
import { getEnv } from './partial';

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  importSchedule(
    file: File,
    departmentId: string,
    studySession: string,
  ): Observable<void> {
    const headers = new HttpHeaders().set(
      InterceptorCustomHeader.skipContentType,
      'true',
    );
    const formData = new FormData();
    formData.append('file', file);
    formData.append('study_session', studySession);
    formData.append('id_department', departmentId);

    return this.http.post<void>(this.url + 'schedule', formData, { headers });
  }
}
