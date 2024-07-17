import { RequestChangeScheduleCode } from '@utconnect/types';

export type ChangeScheduleStatistic = {
  status: RequestChangeScheduleCode[];
  date: string;
};
