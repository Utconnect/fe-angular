import { filter, OperatorFunction, pipe } from 'rxjs';
import { ObjectHelper } from './object.helper';

export class ObservableHelper {
  static filterNullish<T>(): OperatorFunction<T | null | undefined, T> {
    return pipe(filter((x): x is T => !ObjectHelper.isNullOrUndefined(x)));
  }
}
