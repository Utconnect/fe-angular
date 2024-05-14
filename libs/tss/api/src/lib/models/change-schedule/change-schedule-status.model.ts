import { Status } from '@utconnect/types';

export interface ChangeScheduleStatus {
  data: Status;
  queue: number[];
}
