import { Type } from '@angular/core';
import { AuthService } from './abstracts';

export type LoginRequest = {
  userName: string;
  password: string;
};

export interface LoginResponse {
  data: {
    /** @format date-time */
    expiration: Date;
    token: string;
  };
  errors?: unknown[] | null;
  success: boolean;
}

export type AuthConfigOptions<T extends AuthService = AuthService> = {
  authService: Type<T>;
  storage: 'localStorage' | 'sessionStorage';
};
