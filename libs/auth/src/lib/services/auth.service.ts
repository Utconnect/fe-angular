import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../auth.types';
import { Observable } from 'rxjs';

@Injectable()
export abstract class AuthService {
  abstract login(data: LoginRequest): Observable<LoginResponse>;
}
