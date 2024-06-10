import { AcademicData, Teacher } from '@tss/api';
import { BreadcrumbItem } from '@tss/model';
import {
  GoogleCalendar,
  Nullable,
  SimpleModel,
  Status,
} from '@utconnect/types';

export interface TssState {
  status: Status;
  breadcrumbs: BreadcrumbItem[];
  rooms: string[];
  teacher: Nullable<Teacher>;
  currentTerm: string;
  academicData: AcademicData[];
  teachersInDepartment: SimpleModel[];
  showLoader: Nullable<boolean>;
  googleCalendars: GoogleCalendar[];
}
