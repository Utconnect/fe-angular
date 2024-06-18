import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ObjectHelper } from '@utconnect/helpers';

export function differentValueValidator<T>(
  otherValue: T,
  options?: {
    comp?: (a: T, b: T) => boolean;
    error?: unknown;
  },
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const errorValue = { differentValue: options?.error ?? true };
    const value = control.value as T;

    if (
      ObjectHelper.isNullOrUndefined(value) &&
      ObjectHelper.isNullOrUndefined(otherValue)
    ) {
      return null;
    }

    if (
      (!options?.comp && value !== otherValue) ||
      options?.comp?.(value, otherValue) === false
    ) {
      return errorValue;
    }

    return null;
  };
}
