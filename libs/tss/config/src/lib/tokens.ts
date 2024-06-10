import { InjectionToken, ValueProvider } from '@angular/core';
import { TssConfig } from './config';

export const TSS_CONFIG = new InjectionToken<TssConfig>('TSS config');

export const tssConfigProvider = (value: TssConfig): ValueProvider => ({
  provide: TSS_CONFIG,
  useValue: value,
});
