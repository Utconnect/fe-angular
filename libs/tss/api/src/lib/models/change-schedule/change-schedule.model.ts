import { Nullable, RequestChangeScheduleCode, SimpleModel } from '@utconnect/types';

export interface ChangeSchedule {
  id: number;
  teacher: SimpleModel;
  moduleClassName: string;
  oldSchedule: {
    date: string;
    shift: string;
    room: string;
  };
  newSchedule: {
    date: Nullable<string>;
    shift: Nullable<string>;
    room: Nullable<string>;
  };
  reason: string;
  createdAt: Date;
  acceptedAt: Date;
  setRoomAt: Date;
  intendTime: Nullable<string>;
  status: RequestChangeScheduleCode;
  moduleClassNumberReality: number;
}
