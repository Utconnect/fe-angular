import { InjectionToken } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

export const appStoreTestProvider = (
  key: string,
  initialState: unknown,
  env: InjectionToken<unknown>,
) => [
  provideMockStore({
    initialState: {
      [key]: initialState,
    },
  }),
  { provide: env, useValue: {} },
];
