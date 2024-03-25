import { Inject, Injectable } from '@angular/core';
import { ErrorLogger, ErrorLoggerContainsField } from '@utconnect/helpers';
import { ESM_LOGGER_OPTIONS, LoggerOptions } from './logger.provider';

export type NotNullErrorParams<T> = {
  value: T | null | undefined;
  valueType: string;
};

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(
    @Inject(ESM_LOGGER_OPTIONS) private readonly options: LoggerOptions,
  ) {}

  errorNullOrEmpty<T>(params: NotNullErrorParams<T>): T;
  errorNullOrEmpty<T>(params: NotNullErrorParams<T>[]): T[];

  errorNullOrEmpty<T>(
    params: NotNullErrorParams<T> | NotNullErrorParams<T>[],
  ): T | T[] {
    if ('value' in params) {
      return ErrorLogger.nullOrEmpty(
        params.value,
        params.valueType,
        this.options.tag,
      );
    }

    return params.map((p) =>
      ErrorLogger.nullOrEmpty(p.value, p.valueType, this.options.tag),
    );
  }

  containsField<T>(value: object, field: 'id'): value is { id: T };

  containsField(value: object, field: ErrorLoggerContainsField): boolean {
    return ErrorLogger.containsField(value, field, this.options.tag);
  }
}
