import { Result } from '@utconnect/types';

export class ResultBuilder {
  static success<T = boolean>(data?: T): Result<T> {
    return {
      data: data ?? (true as T),
      success: true,
      errors: null,
    };
  }

  static error(): Result<boolean> {
    return {
      data: false,
      success: false,
      errors: [],
    };
  }
}
