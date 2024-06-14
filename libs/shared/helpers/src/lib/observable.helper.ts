import {
  filter,
  Observable,
  OperatorFunction,
  pipe,
  UnaryFunction,
} from 'rxjs';
import { ObjectHelper } from './object.helper';

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
}
