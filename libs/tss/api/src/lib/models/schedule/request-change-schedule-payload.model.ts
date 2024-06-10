import { Nullable } from '@utconnect/types';

export interface RequestChangeSchedulePayload {
  idSchedule: number;
  newDate: string;
  newShift: string;
  newIdRoom: Nullable<string>;
  reason: string;
}

export interface RequestIntendChangeSchedulePayload {
  idSchedule: number;
  intendTime: string;
  reason: string;
}
