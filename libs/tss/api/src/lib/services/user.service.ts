import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ObjectHelper } from '@utconnect/helpers';
import { LocalStorageService, NetworkService } from '@utconnect/services';
import { Observable, of, tap } from 'rxjs';
import { ResetPassword, ResponseModel, Teacher } from '../models';
import { getEnv } from './partial';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();
  private readonly networkService = inject(NetworkService);
  private readonly localStorageService = inject(LocalStorageService);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  me(): Observable<ResponseModel<Teacher>> {
    if (!this.networkService.online) {
      return of(JSON.parse(this.localStorageService.getItem('user') ?? '{}'));
    }

    return this.http
      .get<ResponseModel<Teacher>>(this.url + 'me')
      .pipe(
        tap((r) => this.localStorageService.setItem('user', JSON.stringify(r))),
      );
  }

  resetPassword(body: ResetPassword): Observable<void> {
    return this.http.patch<void>(
      this.url + 'v1/reset-password',
      ObjectHelper.toSnakeCase(body),
    );
  }
}
