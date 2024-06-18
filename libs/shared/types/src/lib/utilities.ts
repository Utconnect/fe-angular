export type Nullable<T> = T | null;

export type Equals<T1, T2> = (<T>() => T extends T1 ? 1 : 2) extends <
  T,
>() => T extends T2 ? 1 : 2
  ? true
  : false;

export type KeysMatching<T extends Record<string, unknown>, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];
