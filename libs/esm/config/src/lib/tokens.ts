import { InjectionToken, ValueProvider } from '@angular/core';
import { EsmConfig } from './config';

export const ESM_CONFIG = new InjectionToken<EsmConfig>('ESM config');

export const esmConfigProvider = (value: EsmConfig): ValueProvider => ({
  provide: ESM_CONFIG,
  useValue: value,
});
