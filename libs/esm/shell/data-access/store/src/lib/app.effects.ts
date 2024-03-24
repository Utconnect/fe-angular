import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_SERVICE_TOKEN, TokenService } from '@auth';
import { EsmAuthService, ExaminationService, FacultyService } from '@esm/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { EsmApiAction } from './app.api.actions';
import { EsmPageAction } from './app.page.actions';
import { EsmSelector } from './app.selectors';
import { EsmState } from './app.state';

@Injectable()
export class EsmEffects {
  // INJECT PROPERTIES
  private readonly router = inject(Router);
  private readonly actions$ = inject(Actions);
  private readonly authService: EsmAuthService = inject(
    AUTH_SERVICE_TOKEN
  ) as EsmAuthService;
  private readonly esmStore = inject(Store<EsmState>);
  private readonly tokenService = inject(TokenService);
  private readonly facultyService = inject(FacultyService);
  private readonly examinationService = inject(ExaminationService);

  // PRIVATE PROPERTIES
  private examinationId$ = this.esmStore.select(EsmSelector.examinationId);

  // EFFECTS
  readonly getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EsmPageAction.getUserInfo),
      mergeMap(() => {
        if (!this.tokenService.get()) {
          return of(EsmApiAction.noCacheUserInfo());
        }
        return this.authService.getMySummaryInfo().pipe(
          map(({ data }) => EsmApiAction.getUserInfoSuccessful({ user: data })),
          catchError(() => of(EsmApiAction.getUserInfoFailed()))
        );
      })
    );
  });

  readonly logOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(EsmPageAction.logOut),
        tap(() => {
          this.tokenService.clear();
          this.router.navigate(['/login']).catch(() => null);
        })
      );
    },
    { dispatch: false }
  );

  readonly getRelatedExaminations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EsmPageAction.getRelatedExaminations),
      mergeMap(() => {
        return this.examinationService.getRelated({ IsActive: true }).pipe(
          map(({ data: relatedExaminations }) =>
            EsmApiAction.getRelatedExaminationsSuccessful({
              relatedExaminations,
            })
          ),
          catchError(() => of(EsmApiAction.getRelatedExaminationsFailed()))
        );
      })
    );
  });

  readonly getDepartments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EsmPageAction.getDepartments),
      mergeMap(() => {
        return this.facultyService.getAllFaculty().pipe(
          map(({ data: departments }) =>
            EsmApiAction.getDepartmentsSuccessful({ departments })
          ),
          catchError(() => of(EsmApiAction.getDepartmentsFailed()))
        );
      })
    );
  });

  readonly changeRouter$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(routerNavigatedAction),
        withLatestFrom(this.examinationId$),
        map(([{ payload }, oldId]) => {
          let firstChild = payload.routerState.root.firstChild;
          let id: string | null = null;
          while (firstChild) {
            if (firstChild.params['examinationId']) {
              id = firstChild.params['examinationId'];
              break;
            }
            firstChild = firstChild.firstChild;
          }

          if (id !== oldId) {
            this.esmStore.dispatch(EsmApiAction.changeExaminationId({ id }));
          }

          return of(null);
        })
      );
    },
    { dispatch: false }
  );

  readonly changeExaminationId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EsmApiAction.changeExaminationId),
      mergeMap(({ id }) => {
        if (id === null) {
          return of(
            EsmApiAction.getExaminationSuccessful({ examination: null })
          );
        }
        return of(EsmPageAction.getExaminationSummary({ id }));
      })
    );
  });

  readonly getExaminationSummary$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EsmPageAction.getExaminationSummary),
      mergeMap(({ id }) => {
        return this.examinationService.getSummary(id).pipe(
          map(({ data: examination }) =>
            EsmApiAction.getExaminationSuccessful({ examination })
          ),
          catchError(() => of(EsmApiAction.getExaminationFailed()))
        );
      })
    );
  });
}
