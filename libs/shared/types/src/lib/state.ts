import { Status } from './status';

type Props<T, E> = {
  '': T;
  Status: Status;
  Error: E | null;
};

export type GenericState<T, S extends string = 'data', E = string> = {
  [key in keyof Props<T, E> as `${S}${key}`]: Props<T, E>[key];
};
