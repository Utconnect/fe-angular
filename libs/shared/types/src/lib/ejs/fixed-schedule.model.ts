import { Nullable } from '../utilities';

export type RequestChangeScheduleCode = [
  100,
  200,
  201,
  202,
  300,
  301,
  302,
  400,
  500,
  501
][number];

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
