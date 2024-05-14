import { Nullable } from '@utconnect/types';

export interface ModuleClass {
  id: string;
  name: string;
  credit?: number;
  type?: number;
  numberPlan?: number;
  numberReality?: number;
  teacher?: Nullable<string>;
}
