import { Type } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { KeysMatching, Nullable } from '@utconnect/types';

export type VirtualGroup<T extends Record<string, unknown>, F> = {
  props: KeysMatching<T, F>[];
  comp: (control: AbstractControl, ...values: Nullable<F>[]) => boolean;
  type: Type<F>;
};

// TODO: Using typed form
export function virtualGroupValidator<T extends Record<string, unknown>, F>(
  _: T,
  group: VirtualGroup<T, F>,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const values = group.props.map((p) => control.get(p as string)?.value);
    if (group.comp(control, ...values)) {
      return null;
    }

    return { sameValue: true };
  };
}
