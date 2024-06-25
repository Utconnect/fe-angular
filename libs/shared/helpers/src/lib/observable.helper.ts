import { difference } from 'lodash';
import {
  filter,
  map,
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction,
  pipe,
  UnaryFunction,
  withLatestFrom,
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

  static filterWith<T, U>(
    other$: Observable<U[]>,
    accept: U[] | U,
  ): MonoTypeOperatorFunction<T> {
    return (source$) => {
      return source$.pipe(
        withLatestFrom(other$),
        filter(({ 1: other }) => {
          if (Array.isArray(accept)) {
            return difference(accept, other).length === 0;
          }
          return other.includes(accept);
        }),
        map(([source]) => source),
      );
    };
  }
}
