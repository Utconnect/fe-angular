export type ErrorResult = {
  code?: number;
  message: string;
  property?: string;
};

export class Result<T> {
  data!: T;
  success!: boolean;
  errors!: ErrorResult[] | null;
}
