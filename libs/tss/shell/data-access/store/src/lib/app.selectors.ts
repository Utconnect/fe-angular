import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { ExtractValue, SidebarEventName } from '@tss/types';
import { ObservableHelper } from '@utconnect/helpers';
import { filter, map, Observable, pipe, UnaryFunction } from 'rxjs';
import { tssFeatureKey } from './app.reducer';
import { TssState } from './app.state';

export class TssSelector {
  private static selector = createFeatureSelector<TssState>(tssFeatureKey);

  static readonly breadcrumbs = createSelector(
    this.selector,
    (state) => state.breadcrumbs,
  );

  static readonly status = createSelector(
    this.selector,
    (state) => state.status,
  );

  static readonly teacher = createSelector(
    this.selector,
    (state) => state.teacher,
  );

  static readonly notNullTeacher = pipe(
    select(this.teacher),
    ObservableHelper.filterNullish(),
  );

  static readonly userName = pipe(
    this.notNullTeacher,
    map((user) => user.name),
  );

  static readonly nameTitle = createSelector(this.teacher, (teacher) => {
    if (teacher === null) {
      return 'Bạn';
    }
    if (teacher.isFemale) {
      return 'Cô';
    }
    return 'Thầy';
  });

  static readonly permission = createSelector(
    this.teacher,
    (teacher) => teacher?.permissions || [],
  );

  static readonly department = createSelector(
    this.teacher,
    (teacher) => teacher?.department || null,
  );

  static readonly faculty = createSelector(
    this.teacher,
    (teacher) => teacher?.faculty || null,
  );

  static readonly rooms = createSelector(this.selector, (state) => state.rooms);

  static readonly schoolYear = createSelector(
    this.selector,
    (state) => state.currentTerm,
  );

  static readonly academicData = createSelector(
    this.selector,
    (state) => state.academicData,
  );

  static readonly trainingTypes = createSelector(
    this.academicData,
    (academicData) => academicData.map(({ name }, i) => ({ name, id: i })),
  );

  static readonly teachersInDepartment = createSelector(
    this.selector,
    (state) => state.teachersInDepartment,
  );

  static readonly showLoader = createSelector(
    this.selector,
    this.status,
    ({ showLoader }, status) => {
      if (showLoader !== null) {
        return showLoader;
      }
      return status === 'loading' || status === 'idle';
    },
  );

  static readonly googleCalendars = createSelector(
    this.selector,
    (state) => state.googleCalendars,
  );

  static readonly sidebarEvent = createSelector(
    this.selector,
    (state) => state.sidebarEvent,
  );

  static readonly sidebarListen = <T extends SidebarEventName>(
    eventName: T,
  ): UnaryFunction<Observable<object>, Observable<ExtractValue<T>>> =>
    pipe(
      select(this.sidebarEvent),
      ObservableHelper.filterNullish(),
      filter(({ name }) => name === eventName),
      map(({ value }) => value as ExtractValue<T>),
    );
}
