import { Nullable } from '@utconnect/types';
import { SimpleModel } from '../core';
import { RequestChangeScheduleCode } from '../request-change-schedule.model';

export interface ChangeScheduleOptions {
  status: Nullable<RequestChangeScheduleCode>;
  teacher: Nullable<SimpleModel>;
  showTime: boolean;
  showReason: boolean;
}

export type ChangeScheduleOptionsParam = Partial<ChangeScheduleOptions>;
