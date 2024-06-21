import {
  filter,
  Observable,
  OperatorFunction,
  pipe,
  UnaryFunction,
} from 'rxjs';
import { ObjectHelper } from './object.helper';

type UnNull<T extends Record<string, unknown>> = {
  [TKey in keyof T]: Exclude<T[TKey], null>;
};

export class ObservableHelper {
  static filterNullish<T>(): OperatorFunction<T | null | undefined, T> {
    return pipe(filter((x): x is T => !ObjectHelper.isNullOrUndefined(x)));
  }

  static filterUndefined<T>(): UnaryFunction<
    Observable<T | undefined>,
    Observable<T>
  > {
    return pipe(
      filter((x) => x !== undefined) as OperatorFunction<T | undefined, T>,
    );
  }

  static filterNullishProp<T extends Record<keyof T, unknown>>(
    props: (keyof T)[],
  ): UnaryFunction<Observable<T>, Observable<UnNull<T>>> {
    return pipe(
      filter((x) => {
        for (let i = 0; i < props.length; i++) {
          const prop = props[i];
          if (ObjectHelper.isNullOrUndefined(x[prop])) {
            return false;
          }
        }
        return true;
      }) as OperatorFunction<T, UnNull<T>>,
    );
  }
}
