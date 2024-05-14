import { RequestChangeScheduleCode } from '../request-change-schedule.model';

export type ChangeScheduleStatistic = {
  status: RequestChangeScheduleCode[];
  date: string;
};
