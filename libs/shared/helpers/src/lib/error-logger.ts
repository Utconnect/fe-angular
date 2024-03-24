export type ErrorLoggerContainsField = 'id';

export class ErrorLogger {
  static nullOrEmpty<T>(
    value: T | null | undefined,
    valueType: string,
    tag: string,
  ): T {
    if (!value) {
      throw new Error(`[${tag}] ${valueType} should not be null or undefined`);
    }
    return value;
  }

  static containsField(
    value: object,
    field: 'id',
    valueType: string,
    tag: string,
  ): value is { id: unknown };

  static containsField(
    value: object,
    field: ErrorLoggerContainsField,
    valueType: string,
    tag: string,
  ): boolean {
    if (field in value) {
      return true;
    }

    throw Error(`[${tag}] Required field ${field} is missing in ${valueType}`);
  }
}
