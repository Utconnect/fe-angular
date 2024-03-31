import { Inject, Injectable } from '@angular/core';
import { ErrorLogger, ErrorLoggerContainsField } from '@utconnect/helpers';
import { LOGGER_OPTIONS, LoggerOptions } from './logger.provider';

export type ValueNameErrorParams<T> = {
  value: T | null | undefined;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(
    @Inject(LOGGER_OPTIONS) private readonly options: LoggerOptions,
  ) {}

  errorNullOrEmpty<T>(params: ValueNameErrorParams<T>): T;
  errorNullOrEmpty<T>(params: ValueNameErrorParams<T>[]): T[];

  errorNullOrEmpty<T>(
    params: ValueNameErrorParams<T> | ValueNameErrorParams<T>[],
  ): T | T[] {
    if ('value' in params) {
      return ErrorLogger.nullOrEmpty(
        params.value,
        params.name,
        this.options.tag,
      );
    }

    return params.map((p) =>
      ErrorLogger.nullOrEmpty(p.value, p.name, this.options.tag),
    );
  }

  containsField<T>(value: object, field: 'id'): value is { id: T };

  containsField(value: object, field: ErrorLoggerContainsField): boolean {
    return ErrorLogger.containsField(value, field, this.options.tag);
  }

  unhandled<T>({ name, value }: ValueNameErrorParams<T>): void {
    return ErrorLogger.unhandled(name, value, this.options.tag);
  }
}
