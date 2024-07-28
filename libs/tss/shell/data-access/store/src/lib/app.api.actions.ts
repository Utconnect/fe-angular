import { createAction, props } from '@ngrx/store';
import { AcademicData, BreadcrumbItem, Teacher } from '@tss/api';
import { GoogleCalendar, SimpleModel } from '@utconnect/types';

export class TssApiAction {
  static readonly updateBreadcrumbs = createAction(
    '[App Shell API] Update breadcrumbs',
    props<{ breadcrumbs: BreadcrumbItem[] }>(),
  );
  static readonly getUserInfoSuccessfully = createAction(
    '[App Shell API] Auto login Successfully',
    props<{ teacher: Teacher }>(),
  );
  static readonly getUserInfoFailure = createAction(
    '[App Shell API] Auto login Failed',
  );
  static readonly loadRoomsSuccessfully = createAction(
    '[App Shell API] Load rooms Successfully',
    props<{ rooms: string[] }>(),
  );
  static readonly loadRoomsFailure = createAction(
    '[App Shell API] Load rooms Failed',
  );
  static readonly loadCurrentTermSuccessful = createAction(
    '[App Shell API] Load current term Successfully',
    props<{ currentTerm: string }>(),
  );
  static readonly loadCurrentTermFailure = createAction(
    '[App Shell API] Load current term Failed',
  );
  static readonly loadAcademicYearSuccessful = createAction(
    '[App Shell API] Load academic year Successfully',
    props<{ academicYears: AcademicData[] }>(),
  );
  static readonly loadAcademicYearFailure = createAction(
    '[App Shell API] Load academic year Failed',
  );
  static readonly loadTeachersInDepartmentSuccessful = createAction(
    '[App Shell API] Load teachers in department Successfully',
    props<{ teachers: SimpleModel[] }>(),
  );
  static readonly loadTeachersInDepartmentFailure = createAction(
    '[App Shell API] Load teachers in department Failed',
  );
  static readonly loadGoogleCalendarSuccessful = createAction(
    '[App Shell API] Load Google calendar Successfully',
    props<{ calendars: GoogleCalendar[] }>(),
  );
  static readonly loadGoogleCalendarFailure = createAction(
    '[App Shell API] Load Google calendar Failed',
  );
}
