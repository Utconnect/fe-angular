import { FacultyDta } from '../../dta';

export class Faculty {
  readonly id!: string;
  readonly name!: string;

  static parse(obj: FacultyDta): Faculty {
    return {
      id: obj.id_faculty,
      name: obj.faculty_name,
    };
  }
}
