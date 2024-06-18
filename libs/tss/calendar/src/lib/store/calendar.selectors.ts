import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExamScheduleModel, StudyScheduleModel } from '@tss/api';
import { SimpleModel } from '@utconnect/types';
import { calendarFeatureKey } from './calendar.reducer';
import { CalendarState } from './calendar.state';

export class TssCalendarSelector {
  private static readonly selector =
    createFeatureSelector<CalendarState>(calendarFeatureKey);

  static readonly selectedDate = createSelector(
    this.selector,
    (state) => state.selectedDate,
  );

  static readonly month = createSelector(this.selector, (state) => state.month);

  static readonly view = createSelector(this.selector, (state) => state.view);

  static readonly status = createSelector(
    this.selector,
    (state) => state.status,
  );

  static readonly ranges = createSelector(this.selector, (state) => ({
    personal: state.schedules.personal.ranges,
    department: state.schedules.department.ranges,
  }));

  private static filterStates = createSelector(
    this.selector,
    (state) => state.filter,
  );

  static readonly filter = createSelector(
    this.filterStates,
    (filter) => filter.active,
  );

  static readonly currentFilter = createSelector(
    this.filterStates,
    (filter) => filter.selecting,
  );

  private static schedule = createSelector(
    this.selector,
    (state) => state.schedules,
  );

  private static study = createSelector(
    this.schedule,
    this.filter,
    (schedules, filter) =>
      filter.showDepartmentSchedule
        ? schedules.department.study
        : schedules.personal.study,
  );

  // const exam = createSelector(
  //   calendarSelectSchedule,
  //   calendarSelectFilter,
  //   (schedules, filter) =>
  //     filter.showDepartmentSchedule
  //       ? schedules.department.exam
  //       : schedules.personal.exam
  // );

  private static scheduleWithType = createSelector(
    this.study,
    // exam,
    (study /* , exam */) => [
      ...study,
      // Only select teachers from teaching schedule for now
      // ...exam
    ],
  );

  private static departmentSchedule = createSelector(
    this.schedule,
    (schedule) => [
      ...schedule.department.study,
      // Only select teachers from teaching schedule for now
      //  ...schedule.department.exam,
    ],
  );

  static readonly teachers = createSelector(
    this.departmentSchedule,
    (schedule) =>
      Array.from(
        schedule.reduce((acc, { people }) => {
          people?.forEach((person) => {
            const id = (person as SimpleModel).id;
            if (id && !acc.get(id)) {
              acc.set(id, (person as SimpleModel).name);
            }
          });
          return acc;
        }, new Map<string, string>()),
        ([id, name]) => ({ id, name }),
      ),
  );

  private static selectingDepartment = createSelector(
    this.filterStates,
    (filter) => filter.selecting.showDepartmentSchedule,
  );

  private static selectingTeacherIds = createSelector(
    this.currentFilter,
    (filter) => filter.teacherIds,
  );

  static readonly activeTeachers = createSelector(
    this.teachers,
    this.filter,
    (teachers, filter) =>
      teachers.filter(({ id }) => filter.teacherIds.includes(id)),
  );

  static readonly modules = createSelector(
    this.selector,
    this.selectingDepartment,
    this.selectingTeacherIds,
    (state, selectingDepartment, selectingTeacherIds) => {
      const schedules = selectingDepartment
        ? state.schedules.department.study
        : state.schedules.personal.study;

      if (!selectingDepartment || selectingTeacherIds.length === 0) {
        return Array.from(
          schedules.reduce((acc, { moduleName }) => {
            if (!acc.get(moduleName)) {
              acc.set(moduleName, true);
            }
            return acc;
          }, new Map<string, boolean>()),
          ([key]) => key,
        );
      }

      return Array.from(
        schedules.reduce((acc, { moduleName, people }) => {
          if (
            !acc.get(moduleName) &&
            (people as SimpleModel[])?.find(({ id }) =>
              selectingTeacherIds.find((selectingId) => id === selectingId),
            )
          ) {
            acc.set(moduleName, true);
          }
          return acc;
        }, new Map<string, boolean>()),
        ([key]) => key,
      );
    },
  );

  static readonly filteredSchedule = createSelector(
    this.scheduleWithType,
    this.filter,
    (schedules, filter) => {
      // Filter by teacher
      let result =
        // If select personal schedule, or select department schedule but without filter by teacher
        !filter.showDepartmentSchedule || filter.teacherIds.length === 0
          ? // then display all
            schedules
          : // else filter to get the schedules that has teacherID equals filtering teacherID
            schedules.filter(({ people }) =>
              (people as SimpleModel[])?.find(({ id }) =>
                filter.teacherIds.find((teacherId) => id === teacherId),
              ),
            );

      // Filter by module
      result =
        filter.modules.length === 0
          ? result
          : // filter to get all Exam, and schedule that has moduleName equals filtering moduleName
            result.filter(
              (schedule) =>
                schedule instanceof ExamScheduleModel ||
                (schedule instanceof StudyScheduleModel &&
                  filter.modules.includes(schedule.moduleName)),
            );
      return result;
    },
  );

  static readonly googleCalendarEvents = createSelector(
    this.selector,
    this.filter,
    ({ googleCalendar }, { showDepartmentSchedule }) =>
      showDepartmentSchedule ? [] : googleCalendar.events,
  );
}
