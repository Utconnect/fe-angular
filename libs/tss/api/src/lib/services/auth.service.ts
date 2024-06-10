import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ChangePasswordResponse,
  IAuthService,
  LoginRequest,
  LoginResponse,
} from '@auth';
import { Observable, of } from 'rxjs';
import { getEnv } from './partial';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  // PUBLIC METHODS
  login(data: LoginRequest): Observable<LoginResponse> {
    const obj = { username: data.userName, password: data.password };
    return this.http.post<LoginResponse>(this.url + 'login', obj);
  }

  changePassword(data: {
    newPassword: string;
    oldPassword: string;
  }): Observable<ChangePasswordResponse> {
    console.log(data);
    return of({
      data: true,
      success: true,
    });
  }

  logOut(): Observable<void> {
    return this.http.post<void>(this.url + 'logout', {});
  }
}

@Injectable()
export class TssAuthService extends AuthService implements IAuthService {}
