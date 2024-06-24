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
  private readonly env = getEnv();
  private readonly http = inject(HttpClient);

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
}

@Injectable()
export class TssAuthService extends AuthService implements IAuthService {}
