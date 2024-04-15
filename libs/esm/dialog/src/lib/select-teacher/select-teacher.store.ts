import { inject, Injectable } from '@angular/core';
import { TeacherService, UserSummary } from '@esm/api';
import { EsmHttpErrorResponse } from '@esm/model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ErrorResult, Status } from '@utconnect/types';
import { switchMap, tap } from 'rxjs';

type SelectTeacherDialogState = {
  data: UserSummary[];
  status: Status;
  errors: ErrorResult[] | null;
};

@Injectable()
export class SelectTeacherDialogStore extends ComponentStore<SelectTeacherDialogState> {
  // INJECT PROPERTIES
  private readonly userService = inject(TeacherService);

  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);

  // EFFECTS
  readonly search = this.effect<string>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', errors: null })),
      switchMap((fullName) =>
        this.userService.search({ FullName: fullName }).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data,
                status: 'success',
              }),
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
      data: [],
    });
  }
}
