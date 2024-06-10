import { Nullable } from '@utconnect/types';
import { ChangeSchedulePayload } from './change-schedule-payload.model';
import { FixedScheduleModel } from '../../../../../../shared/types/src/lib/ejs/fixed-schedule.model';

export type ChangedScheduleModel = {
  [key: number]: {
    id: number;
    fixedSchedules: Nullable<FixedScheduleModel[]>;
    schedule: {
      change: boolean;
      data: ChangeSchedulePayload;
      note: string;
    };
  } | null;
};
