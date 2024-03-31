import { inject, Injectable } from '@angular/core';
import {
  ESMApplicationFacultiesCommandsCreateCreateCommand,
  ESMApplicationFacultiesCommandsUpdateUpdateRequest,
  FacultyService,
} from '@esm/api';
import { EsmHttpErrorResponse } from '@esm/model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ErrorResult, Status } from '@utconnect/types';
import { switchMap, tap } from 'rxjs';

type EsmEditFacultyDialogState = {
  status: Status;
  errors: ErrorResult[] | null;
};

@Injectable()
export class EsmEditFacultyDialogStore extends ComponentStore<EsmEditFacultyDialogState> {
  // INJECT PROPERTIES
  private readonly facultyService = inject(FacultyService);

  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);

  // EFFECTS
  readonly create =
    this.effect<ESMApplicationFacultiesCommandsCreateCreateCommand>((params$) =>
      params$.pipe(
        tap(() => this.patchState({ status: 'loading', errors: null })),
        switchMap((param) =>
          this.facultyService.createFaculty(param).pipe(
            tapResponse(
              () => {
                this.patchState({ status: 'success' });
              },
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
    request: ESMApplicationFacultiesCommandsUpdateUpdateRequest;
  }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', errors: null })),
      switchMap(({ id, request }) =>
        this.facultyService.updateFaculty(id, request).pipe(
          tapResponse(
            () => {
              this.patchState({ status: 'success' });
            },
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
    });
  }
}
