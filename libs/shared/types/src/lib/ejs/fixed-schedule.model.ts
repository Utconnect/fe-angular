import { RequestChangeScheduleCode } from '@tss/types';
import { Nullable } from '../utilities';

export interface SimpleFixedScheduleModel {
  id: number;
  newDate: Nullable<string>;
  newShift: Nullable<string>;
  newIdRoom: Nullable<string>;
  status: RequestChangeScheduleCode;
  createdAt: Date;
  intendTime: Nullable<string>;
}

export interface FixedScheduleModel extends SimpleFixedScheduleModel {
  idSchedule: number;
  oldDate: string;
  oldIdRoom: string;
  oldShift: string;
  isNew?: boolean;
}
