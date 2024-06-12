import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ObjectHelper } from '@utconnect/helpers';
import { LocalStorageService } from '@utconnect/services';
import { Observable, of, tap } from 'rxjs';
import {
  ChangePassword,
  Feedback,
  ResetPassword,
  ResponseModel,
  Teacher,
  ValidateToken,
} from '../models';
import { NetworkService } from '../../../../../shared/services/src/lib/core/network/online.service';
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

  changePassword(uuid: string, body: ChangePassword): Observable<void> {
    return this.http.patch<void>(
      this.url + `accounts/change-password/${uuid}`,
      body,
    );
  }

  sendFeedback(body: Feedback): Observable<void> {
    return this.http.post<void>(this.url + 'feedback/create', body);
  }

  updateInformation(
    body: Record<string, string>,
    id: string,
  ): Observable<void> {
    return this.http.patch<void>(this.url + `accounts/update/${id}`, body);
  }

  verifyResetPassword(body: ValidateToken): Observable<void> {
    return this.http.post<void>(this.url + 'v1/verify-reset-password', body);
  }

  requestResetPassword(email: string): Observable<void> {
    return this.http.post<void>(this.url + 'v1/request-reset-password', {
      email,
    });
  }

  resetPassword(body: ResetPassword): Observable<void> {
    return this.http.patch<void>(
      this.url + 'v1/reset-password',
      ObjectHelper.toSnakeCase(body),
    );
  }
}
