import { Nullable } from '@utconnect/types';
import { Teacher } from '../core';

export interface AuthResponse {
  token: string;
  teacher: Nullable<Teacher>;
}
