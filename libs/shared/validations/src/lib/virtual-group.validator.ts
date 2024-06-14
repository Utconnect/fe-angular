import { Type } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ObjectHelper } from '@utconnect/helpers';
import { KeysMatching, Nullable } from '@utconnect/types';

export type VirtualGroup<T, F> = {
  props: [KeysMatching<T, F>, KeysMatching<T, F>];
  comp: (a: Nullable<F>, b: Nullable<F>, control?: AbstractControl) => boolean;
  type: Type<F>;
};

export function virtualGroupValidator<T extends Record<string, unknown>, F>(
  obj: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groups?: VirtualGroup<T, F>,
  // Record<keyof U, (a: T, b: T) => boolean>
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    for (const key of Object.keys(obj)) {
      const controlValue = control.get(key)?.value;
      const value = obj[key];
      if (
        ObjectHelper.isNullOrUndefined(value) &&
        ObjectHelper.isNullOrUndefined(controlValue)
      ) {
        continue;
      }

      if (
        (controlValue !== value && !groups?.[key]) ||
        groups?.[key]?.(controlValue, value as Nullable<T[string]>, control) ===
          false
      ) {
        return null;
      }
    }

    return { sameValue: true };
  };
}
