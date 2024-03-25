import { OnLoginSuccessType } from './login.types';
import { InjectionToken, ValueProvider } from '@angular/core';

export const ON_LOGIN_SUCCESS_TOKEN = new InjectionToken<OnLoginSuccessType>(
  'On login success',
);

export const loginProvider = (callback: OnLoginSuccessType): ValueProvider => ({
  provide: ON_LOGIN_SUCCESS_TOKEN,
  useValue: callback,
});
