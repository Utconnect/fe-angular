import { Provider, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  REQUIRED_STEP_STEP_TOKEN,
  REQUIRED_STEP_LIST_TOKEN,
  RequiredStep,
} from './required-step.tokens';

type RequiredStepProvidersOptions<T extends Store> = {
  step: (store: T) => Observable<number | undefined>;
  list: (store: T) => Observable<RequiredStep[]>;
  store: Type<T>;
};

export const requiredStepProviders: <T extends Store>(
  options: RequiredStepProvidersOptions<T>,
) => Provider = ({ step, list, store }) => [
  {
    provide: REQUIRED_STEP_STEP_TOKEN,
    useFactory: step,
    deps: [store],
  },
  {
    provide: REQUIRED_STEP_LIST_TOKEN,
    useFactory: list,
    deps: [store],
  },
];
