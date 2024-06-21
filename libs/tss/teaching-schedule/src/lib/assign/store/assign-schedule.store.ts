import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  ClassService,
  CommonInfoService,
  ModuleClass,
  SearchAssignSchedule,
  TeacherService,
} from '@tss/api';
import { TssSelector, TssState } from '@tss/store';
import { ObservableHelper, StringHelper } from '@utconnect/helpers';
import {
  Nullable,
  SimpleMapModel,
  SimpleModel,
  Status,
} from '@utconnect/types';
import {
  map,
  Observable,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type StateStatus = {
  filter: Status;
  assign: Status;
  unassign: Status;
};
type Teacher = {
  data: SimpleModel[];
  selected: Nullable<SimpleModel>;
  action: Nullable<SimpleModel>;
  actionCount: number;
};
type AssignScheduleState = {
  departments: SimpleMapModel<string, SimpleModel[]>[];
  data: ModuleClass[];
  selected: string[];
  status: StateStatus;
  teacher: Teacher;
};

@Injectable()
export class TssTeachingScheduleAssignStore extends ComponentStore<AssignScheduleState> {
  // INJECTIONS
  private readonly commonInfoService = inject(CommonInfoService);
  private readonly classService = inject(ClassService);
  private readonly teacherService = inject(TeacherService);
  private readonly appStore = inject(Store<TssState>);

  // PRIVATE PROPERTIES
  private readonly _status$ = this.select((s) => s.status);
  private readonly _teacher$ = this.select((s) => s.teacher);
  private readonly _selected$ = this.select((s) => s.selected);

  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  readonly departments$ = this.select((s) => s.departments);

  readonly needAssign$ = this.select(this.data$, (data) =>
    data.filter(({ teacher }) => !teacher),
  );
  readonly assigned$ = this.select(this.data$, (data) =>
    data.filter(({ teacher }) => !!teacher),
  );

  readonly selectedNeedAssign$ = this.select(
    this.needAssign$,
    this._selected$,
    (needAssignSchedule, selected) =>
      needAssignSchedule.filter(({ id }) => selected.includes(id)),
  );
  readonly selectedAssigned$ = this.select(
    this.assigned$,
    this._selected$,
    this._teacher$,
    (assignedSchedule, selected, teacher) =>
      assignedSchedule.filter(
        (x) =>
          (!teacher.selected || x.teacher === teacher.selected?.name) &&
          selected.includes(x.id),
      ),
  );

  readonly myDepartment$ = this.appStore
    .select(TssSelector.department)
    .pipe(takeUntil(this.destroy$));
  readonly currentTerm$ = this.appStore
    .select(TssSelector.schoolYear)
    .pipe(takeUntil(this.destroy$));
  readonly academicData$ = this.appStore
    .select(TssSelector.academicData)
    .pipe(takeUntil(this.destroy$));
  readonly trainingTypes$ = this.appStore
    .select(TssSelector.trainingTypes)
    .pipe(takeUntil(this.destroy$));

  // EFFECTS
  readonly loadDepartment = this.effect((params$) =>
    params$.pipe(
      switchMap(() =>
        this.commonInfoService.getFaculties().pipe(
          tapResponse(
            (r) => this.patchState({ departments: r.data }),
            // TODO: Handle error
            () => this.patchState((state) => state),
          ),
        ),
      ),
    ),
  );

  readonly filter = this.effect<{
    dep: string;
    params: SearchAssignSchedule;
  }>((params$) =>
    params$.pipe(
      tap(() =>
        this.patchState(({ status }) => ({
          status: { ...status, filter: 'loading' },
        })),
      ),
      switchMap(({ dep, params }) =>
        this.classService.getDepartmentModuleClass(dep, params).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState(({ status }) => ({
                data,
                status: { ...status, filter: 'success' },
              })),
            // TODO: Handle error
            () => this.patchState((state) => state),
          ),
        ),
      ),
    ),
  );

  readonly loadTeacher = this.effect<string>((params$) =>
    params$.pipe(
      switchMap((dep) =>
        this.teacherService.getByDepartment(dep).pipe(
          tapResponse(
            ({ data }) => {
              const sortedData = [...data];
              sortedData.sort((a, b) =>
                StringHelper.nameCompareFn(a.name, b.name),
              );

              this.patchState(() => ({
                teacher: {
                  data: sortedData,
                  selected: null,
                  action: null,
                  actionCount: 0,
                },
              }));
            },
            // TODO: Handle error
            () => this.patchState((state) => state),
          ),
        ),
      ),
    ),
  );

  readonly assign = this.effect((params$) =>
    params$.pipe(
      tap(() =>
        this.patchState(({ status }) => ({
          status: { ...status, assign: 'loading' },
        })),
      ),
      withLatestFrom(
        this.select(this._teacher$, (t) => t.selected).pipe(
          ObservableHelper.filterNullish(),
        ),
        this.selectedNeedAssign$.pipe(map((s) => s.map(({ id }) => id))),
      ),
      switchMap(({ 1: teacher, 2: classIds }) =>
        this.classService.assign(teacher.id, classIds).pipe(
          tapResponse(
            () =>
              this.patchState((state) => {
                const newState = structuredClone(state) as AssignScheduleState;
                newState.data.forEach((c) => {
                  if (classIds.includes(c.id)) {
                    c.teacher = teacher.name;
                  }
                });
                const selected = state.selected.filter(
                  (s) => !classIds.includes(s),
                );

                return {
                  ...newState,
                  selected,
                  teacher: {
                    ...state.teacher,
                    action: teacher,
                    actionCount: classIds.length,
                  },
                  status: { ...state.status, assign: 'success' },
                };
              }),
            // TODO: Handle error
            () => this.patchState((state) => state),
          ),
        ),
      ),
    ),
  );

  readonly unassign = this.effect((params$) =>
    params$.pipe(
      tap(() =>
        this.patchState(({ status }) => ({
          status: { ...status, unassign: 'loading' },
        })),
      ),
      withLatestFrom(
        this.selectedAssigned$.pipe(map((s) => s.map(({ id }) => id))),
      ),
      switchMap(({ 1: classIds }) =>
        this.classService.unassign(classIds).pipe(
          tapResponse(
            () =>
              this.patchState((state) => {
                const newState = structuredClone(state) as AssignScheduleState;
                newState.data.forEach((c) => {
                  if (classIds.includes(c.id)) {
                    c.teacher = null;
                  }
                });

                return {
                  ...newState,
                  teacher: {
                    ...state.teacher,
                    action: null,
                    actionCount: classIds.length,
                  },
                  selected: state.selected.filter((s) => !classIds.includes(s)),
                  status: { ...state.status, unassign: 'success' },
                };
              }),
            // TODO: Handle error
            () => this.patchState((state) => state),
          ),
        ),
      ),
    ),
  );

  readonly status$ = (prop: keyof StateStatus): Observable<Status> =>
    this.select(this._status$, (s) => s[prop]);
  readonly teacher$: <T extends keyof Teacher>(
    prop: T,
  ) => Observable<Teacher[T]> = (prop) =>
    this.select(this._teacher$, (t) => t[prop]);

  // CONSTRUCTOR
  constructor() {
    super(<AssignScheduleState>{
      departments: [],
      data: [],
      selected: [],
      status: { filter: 'idle', assign: 'idle', unassign: 'idle' },
      teacher: { data: [], selected: null, action: null, actionCount: 0 },
    });
  }

  // PUBLIC METHODS
  changeSelected(classIds: string[], checked: boolean): void {
    this.patchState(({ selected }) => ({
      selected: checked
        ? [...selected, ...classIds]
        : selected.filter((x) => !classIds.includes(x)),
    }));
  }

  changeSelectedTeacher(teacher: Nullable<SimpleModel>): void {
    this.patchState((state) => ({
      teacher: {
        ...state.teacher,
        selected: teacher,
      },
    }));
  }
}
