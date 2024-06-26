import { inject, Injectable } from '@angular/core';
import { ErrorLogger, ErrorLoggerContainsField } from '@utconnect/helpers';
import { LoggerOptions, LOGGER_OPTIONS } from './logger.provider';

export type ValueNameErrorParams<T> = {
  value: T | null | undefined;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  // INJECTIONS
  private readonly options = inject<LoggerOptions>(LOGGER_OPTIONS);

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
