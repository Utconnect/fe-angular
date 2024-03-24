import { Status } from '@utconnect/types';

export type EchoMessage = {
  id: number;
  data: {
    content: string;
  };
  type: number;
  createdAt: Date;
  updatedAt: Date;
  readAt: Date | null;
  sender: string;
};

export type NotificationType = {
  data: EchoMessage[];
  label: string;
  status: Status;
  error: string | null;
  hasNext: boolean;
  milestone: string | null;
};
