import { FactoryProvider, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { REQUIRED_STEP_TOKEN, RequiredStep } from './required-step.tokens';

type RequiredStepProvidersOptions<T extends Store> = {
  factory: (store: T) => Observable<RequiredStep[]>;
  store: Type<T>;
};

export const requiredStepProviders: <T extends Store>(
  options: RequiredStepProvidersOptions<T>,
) => FactoryProvider = ({ factory, store }) => ({
  provide: REQUIRED_STEP_TOKEN,
  useFactory: factory,
  deps: [store],
});
