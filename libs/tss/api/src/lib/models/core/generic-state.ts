import { Nullable, Status } from '@utconnect/types';

export interface GenericState<T> {
  data: T;
  status: Status;
  error: Nullable<string>;
}
