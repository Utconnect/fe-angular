import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../types';

@Injectable()
export abstract class AuthService {
  abstract login(data: LoginRequest): Observable<LoginResponse>;
}
