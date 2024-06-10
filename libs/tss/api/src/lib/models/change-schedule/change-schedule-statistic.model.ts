import { RequestChangeScheduleCode } from '@tss/types';

export type ChangeScheduleStatistic = {
  status: RequestChangeScheduleCode[];
  date: string;
};
