import { RequestChangeScheduleCode } from '@tss/types';
import { Nullable, SimpleModel } from '@utconnect/types';

export interface ChangeScheduleOptions {
  status: Nullable<RequestChangeScheduleCode>;
  teacher: Nullable<SimpleModel>;
  showTime: boolean;
  showReason: boolean;
}

export type ChangeScheduleOptionsParam = Partial<ChangeScheduleOptions>;
