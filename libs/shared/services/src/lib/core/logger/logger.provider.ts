import { InjectionToken, Provider, SkipSelf } from '@angular/core';

export type LoggerOptions = {
  tag: string;
};

export const ESM_LOGGER_DEFAULT_OPTIONS: LoggerOptions = {
  tag: 'global',
};

export const ESM_LOGGER_OPTIONS = new InjectionToken('', {
  factory: (): LoggerOptions => ESM_LOGGER_DEFAULT_OPTIONS,
});

export function loggerProvider(options: Partial<LoggerOptions>): Provider {
  return {
    provide: ESM_LOGGER_OPTIONS,
    deps: [[new SkipSelf(), ESM_LOGGER_OPTIONS]],
    useFactory: (parent: LoggerOptions | null): LoggerOptions => ({
      ...(parent || ESM_LOGGER_DEFAULT_OPTIONS),
      ...options,
    }),
  };
}
