import { InjectionToken, Provider, SkipSelf } from '@angular/core';

export type LoggerOptions = {
  tag: string;
};

export const LOGGER_DEFAULT_OPTIONS: LoggerOptions = {
  tag: 'global',
};

export const LOGGER_OPTIONS = new InjectionToken('', {
  factory: (): LoggerOptions => LOGGER_DEFAULT_OPTIONS,
});

export function loggerProvider(options: Partial<LoggerOptions>): Provider {
  return {
    provide: LOGGER_OPTIONS,
    deps: [[new SkipSelf(), LOGGER_OPTIONS]],
    useFactory: (parent: LoggerOptions | null): LoggerOptions => ({
      ...(parent || LOGGER_DEFAULT_OPTIONS),
      ...options,
    }),
  };
}
