import { inject, Injectable } from '@angular/core';
import { GetTeachersData, TeacherService } from '@esm/api';
import { EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Status } from '@utconnect/types';
import {
  combineLatest,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type DataInvigilatorState = {
  selectedFacultyId: string;
  selectedDepartmentId: string;
  invigilators: GetTeachersData['data'];
  cachedFacultyIds: string[];
  status: Status;
};

@Injectable()
export class DataInvigilatorStore extends ComponentStore<DataInvigilatorState> {
  // INJECT PROPERTIES
  private readonly userService = inject(TeacherService);
  private readonly appStore = inject(Store<EsmState>);

  // STATE SELECTORS
  readonly status$ = this.select((s) => s.status);
  readonly invigilators$ = this.select((s) => s.invigilators);
  readonly cachedFacultyIds$ = this.select((s) => s.cachedFacultyIds);

  private readonly selectedFacultyId$ = this.select((s) => s.selectedFacultyId);
  private readonly selectedDepartmentId$ = this.select(
    (s) => s.selectedDepartmentId,
  );

  // GLOBAL SELECTORS
  private readonly faculties$ = this.appStore
    .select(EsmSelector.faculties)
    .pipe(takeUntil(this.destroy$));
  private readonly facultiesWithDepartment$ = this.appStore
    .select(EsmSelector.facultiesWithDepartment)
    .pipe(takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  private readonly selectedFacultyName$ = combineLatest([
    this.faculties$,
    this.selectedFacultyId$,
  ]).pipe(
    map(([faculties, id]) => faculties.find((f) => f.id === id)?.name ?? ''),
  );

  private readonly departments$ = combineLatest([
    this.facultiesWithDepartment$,
    this.selectedFacultyId$,
  ]).pipe(
    map(
      ([faculties, id]) =>
        faculties.find((f) => f.id === id)?.departments ?? [],
    ),
  );

  private readonly selectedDepartmentName$ = combineLatest([
    this.departments$,
    this.selectedDepartmentId$,
  ]).pipe(
    map(
      ([departments, id]) => departments.find((d) => d.id === id)?.name ?? '',
    ),
  );

  readonly headerObservables$ = combineLatest([
    this.selectedFacultyName$,
    this.selectedFacultyId$,
    this.selectedDepartmentName$,
    this.selectedDepartmentId$,
    this.faculties$,
    this.departments$,
  ]).pipe(
    map(
      ([
        selectedFacultyName,
        selectedFacultyId,
        selectedDepartmentName,
        selectedDepartmentId,
        faculties,
        departments,
      ]) => ({
        selectedFacultyName,
        selectedFacultyId,
        selectedDepartmentName,
        selectedDepartmentId,
        faculties,
        departments,
      }),
    ),
  );

  readonly tableObservables$ = combineLatest([
    this.invigilators$,
    this.selectedFacultyId$,
    this.selectedDepartmentId$,
  ]).pipe(
    map(([invigilators, selectedFacultyId, selectedDepartmentId]) => ({
      invigilators,
      selectedFacultyId,
      selectedDepartmentId,
    })),
  );

  // EFFECTS
  readonly changeQueryParams = this.effect<{
    facultyId: string;
    departmentId: string;
  }>((params$) =>
    params$.pipe(
      withLatestFrom(this.selectedFacultyId$, this.selectedDepartmentId$),
      tap(
        ([
          { facultyId, departmentId },
          selectedFacultyId,
          selectedDepartmentId,
        ]) => {
          if (
            facultyId !== selectedFacultyId ||
            // Case reload page, and query params is empty
            (facultyId === selectedFacultyId &&
              departmentId === selectedDepartmentId)
          ) {
            this.loadFaculty({ facultyId, departmentId });
          } else if (departmentId !== selectedDepartmentId) {
            this.loadDepartment(departmentId);
          }
        },
      ),
    ),
  );

  private readonly loadFaculty = this.effect<{
    facultyId: string;
    departmentId: string;
    force?: boolean;
  }>((params$) =>
    params$.pipe(
      tap(({ facultyId, departmentId, force }) =>
        this.patchState({
          selectedFacultyId: force ? undefined : facultyId,
          selectedDepartmentId: force ? undefined : departmentId,
          status: 'loading',
        }),
      ),
      withLatestFrom(this.cachedFacultyIds$, this.faculties$),
      switchMap(([{ facultyId, force }, cached, faculties]) => {
        if (
          !force &&
          (cached.length === faculties.length || cached.includes(facultyId))
        ) {
          this.patchState({ status: 'success' });
          return of(null);
        }

        const request = this.userService.getTeachers({
          IsInvigilator: true,
          FacultyId: facultyId,
        });

        return request.pipe(
          tapResponse(
            ({ data }) => {
              this.patchState((state) => ({
                invigilators: facultyId
                  ? [...state.invigilators, ...data]
                  : data,
                cachedFacultyIds: facultyId
                  ? [...state.cachedFacultyIds, facultyId]
                  : faculties.map((f) => f.id),
                status: 'success',
              }));
            },
            () => this.patchState({ status: 'error' }),
          ),
        );
      }),
    ),
  );

  private readonly loadDepartment = this.effect<string>((params$) =>
    params$.pipe(tap((id) => this.patchState({ selectedDepartmentId: id }))),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      selectedFacultyId: '',
      selectedDepartmentId: '',
      invigilators: [],
      cachedFacultyIds: [],
      status: 'idle',
    });
  }

  // PUBLIC METHODS
  loadAfterCreated(): void {
    this.loadFaculty({
      departmentId: '',
      facultyId: '',
      force: true,
    });
  }
}
