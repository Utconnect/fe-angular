import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
} from '../auth.types';

@Injectable()
export abstract class IAuthService {
  abstract login(data: LoginRequest): Observable<LoginResponse>;

  abstract changePassword(data: {
    newPassword: string;
    oldPassword: string;
  }): Observable<ChangePasswordResponse>;
}
