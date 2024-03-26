import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ObjectHelper } from '@utconnect/helpers';

export function sameControlValueValidator<T>(
  otherControl: AbstractControl,
  options?: {
    comp?: (a: T, b: T) => boolean;
    error?: unknown;
  },
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const errorValue = { sameValue: options?.error ?? true };
    const value = control.value as T;
    const otherValue = otherControl.value as T;

    if (
      ObjectHelper.isNullOrUndefined(value) &&
      ObjectHelper.isNullOrUndefined(otherValue)
    ) {
      return errorValue;
    }

    if (
      (!options?.comp && value !== otherValue) ||
      options?.comp?.(value, otherValue) === false
    ) {
      return null;
    }

    return errorValue;
  };
}
