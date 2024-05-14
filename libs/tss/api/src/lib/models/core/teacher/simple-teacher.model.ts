import { Nullable,SimpleModel } from '@utconnect/types';

export interface SimpleTeacher {
  readonly birth: Nullable<string>;
  readonly department: SimpleModel;
  readonly faculty: SimpleModel;
  readonly id: string;
  readonly isActive: boolean;
  readonly isFemale: boolean;
  readonly isHeadOfDepartment: boolean;
  readonly isHeadOfFaculty: boolean;
  readonly name: string;
  readonly phone: Nullable<string>;
  readonly universityTeacherDegree: Nullable<string>;
}
