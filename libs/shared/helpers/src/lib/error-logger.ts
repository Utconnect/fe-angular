export type ErrorLoggerContainsField = 'id';

export class ErrorLogger {
  static nullOrEmpty<T>(
    value: T | null | undefined,
    name: string,
    tag: string,
  ): T {
    if (!value) {
      throw new Error(`[${tag}] ${name} should not be null or undefined`);
    }
    return value;
  }

  static containsField(
    value: object,
    field: 'id',
    tag: string,
  ): value is { id: unknown };

  static containsField(
    value: object,
    field: ErrorLoggerContainsField,
    tag: string,
  ): boolean {
    if (field in value) {
      return true;
    }

    throw Error(`[${tag}] Required field ${field} is missing in ${value}`);
  }

  static unhandled<T>(name: string, value: T, tag: string): void {
    throw Error(`[${tag}] Unhandled ${name} with value ${value}`);
  }
}
