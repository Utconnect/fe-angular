import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export type RequiredStep<TStep = number> = {
  step: TStep;
  routerLink: unknown[] | string;
  title: string;
  description: string;
};

export const REQUIRED_STEP_LIST_TOKEN = new InjectionToken<
  Observable<RequiredStep[]>
>('[Required Step] Step list');

export const REQUIRED_STEP_STEP_TOKEN = new InjectionToken<Observable<number>>(
  '[Required Step] Step',
);
