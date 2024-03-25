import { inject, Injectable } from '@angular/core';
import {
  DepartmentService,
  ESMApplicationDepartmentsCommandsCreateUserInDepartmentCreateUserInDepartmentParams,
  ESMApplicationTeachersCommandsUpdateUpdateRequest,
  TeacherService,
} from '@esm/api';
import { EsmHttpErrorResponse } from '@esm/model';
import { EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ErrorResult, Status } from '@utconnect/types';
import { switchMap, takeUntil, tap } from 'rxjs';

type EditInvigilatorDialogState = {
  status: Status;
  errors: ErrorResult[] | null;
  responseData: string | null;
};

@Injectable()
export class EditInvigilatorDialogStore extends ComponentStore<EditInvigilatorDialogState> {
  // INJECT PROPERTIES
  private readonly teacherService = inject(TeacherService);
  private readonly appStore = inject(Store<EsmState>);
  private readonly departmentService = inject(DepartmentService);

  // PUBLIC PROPERTIES
  readonly faculties$ = this.appStore
    .select(EsmSelector.facultiesWithDepartment)
    .pipe(takeUntil(this.destroy$));
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);
  readonly responseData$ = this.select((s) => s.responseData);

  // EFFECTS
  readonly create = this.effect<{
    departmentId: string;
    request: ESMApplicationDepartmentsCommandsCreateUserInDepartmentCreateUserInDepartmentParams;
  }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', errors: null })),
      switchMap(({ departmentId, request }) =>
        this.departmentService.createUser(departmentId, request).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({ responseData: data, status: 'success' }),
            (res: EsmHttpErrorResponse) =>
              this.patchState({
                status: 'error',
                errors: res.error.errors,
              }),
          ),
        ),
      ),
    ),
  );

  readonly update = this.effect<{
    id: string;
    request: ESMApplicationTeachersCommandsUpdateUpdateRequest;
  }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', errors: null })),
      switchMap(({ id, request }) =>
        this.teacherService.updateInfo(id, request).pipe(
          tapResponse(
            () => this.patchState({ responseData: id, status: 'success' }),
            (res: EsmHttpErrorResponse) =>
              this.patchState({
                status: 'error',
                errors: res.error.errors,
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
      errors: null,
      responseData: null,
    });
  }
}
