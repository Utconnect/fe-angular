import { inject, Injectable } from '@angular/core';
import { GetAllFacultyData, ModuleService } from '@esm/api';
import { EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Status } from '@utconnect/types';
import { combineLatest, map, switchMap, takeUntil, tap } from 'rxjs';

type EsmEditModuleDialogState = {
  status: Status;
  error: string | null;
};

export type EsmEditModuleDialogFaculty = Omit<
  GetAllFacultyData['data'],
  'departments'
>;

export type EsmEditModuleDialogDepartment =
  GetAllFacultyData['data'][number]['departments'][number] & {
    facultyId: string;
  };

export type EsmEditModuleDialogCreateParams = {
  displayId: string;
  name: string;
  facultyId: string;
  departmentId: string | null;
};

@Injectable()
export class EsmEditModuleDialogStore extends ComponentStore<EsmEditModuleDialogState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);
  private readonly moduleService = inject(ModuleService);

  // STATE SELECTORS
  readonly status$ = this.select((s) => s.status);

  // GLOBAL SELECTORS
  private readonly facultiesWithDepartment$ = this.appStore
    .select(EsmSelector.facultiesWithDepartment)
    .pipe(takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  readonly faculties$ = this.facultiesWithDepartment$.pipe(
    map((e) => e.map(({ departments, ...rest }) => rest)),
  );

  readonly departments$ = this.facultiesWithDepartment$.pipe(
    map((e) =>
      e.reduce((acc, curr) => {
        acc = [
          ...acc,
          ...curr.departments.map((d) => ({ ...d, facultyId: curr.id })),
        ];
        return acc;
      }, [] as EsmEditModuleDialogDepartment[]),
    ),
  );

  readonly observables$ = combineLatest([
    this.faculties$,
    this.departments$,
    this.status$,
  ]).pipe(
    map(([faculties, departments, status]) => ({
      faculties,
      departments,
      status,
    })),
  );

  // EFFECTS
  readonly create = this.effect<EsmEditModuleDialogCreateParams>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap((params) =>
        this.moduleService.createModule(params).pipe(
          tapResponse(
            () => {
              this.patchState({ status: 'success' });
            },
            (error) =>
              this.patchState({
                status: 'error',
                error: error as string,
              }),
          ),
        ),
      ),
    ),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      status: 'idle',
      error: null,
    });
  }
}
