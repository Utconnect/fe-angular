import { Provider, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  REQUIRED_STEP_DATA_TOKEN,
  REQUIRED_STEP_TOKEN,
  RequiredStep,
} from './required-step.tokens';

type RequiredStepProvidersOptions<T extends Store, D> = {
  data: (store: T) => Observable<D>;
  factory: (data: Observable<D>) => Observable<RequiredStep[]>;
  store: Type<T>;
};

export const requiredStepProviders: <T extends Store, D>(
  options: RequiredStepProvidersOptions<T, D>,
) => Provider = ({ data, factory, store }) => [
  {
    provide: REQUIRED_STEP_DATA_TOKEN,
    useFactory: data,
    deps: [store],
  },
  {
    provide: REQUIRED_STEP_TOKEN,
    useFactory: factory,
    deps: [REQUIRED_STEP_DATA_TOKEN],
  },
];
