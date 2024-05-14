import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenService } from '@auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { ObservableHelper } from '@utconnect/helpers';
import { RedirectService } from '@utconnect/services';
import { AuthService } from '@tss/api';
import { catchError, filter, map, mergeMap, of, tap } from 'rxjs';
import * as ApiAction from './app.api.actions';
import * as PageAction from './app.page.actions';

@Injectable()
export class AppShellEffects {
  // INJECT PROPERTIES
  private readonly router = inject(Router);
  private readonly actions$ = inject(Actions);
  private readonly location = inject(Location);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly tokenService = inject(TokenService);
  private readonly googleService = inject(GoogleService);
  private readonly teacherService = inject(TeacherService);
  private readonly redirectService = inject(RedirectService);
  private readonly commonInfoService = inject(CommonInfoService);

  // EFFECTS
  readonly changeRouter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      map(({ payload }) => {
        const breadcrumbs = this.createBreadcrumbs(payload.routerState.root);
        return ApiAction.updateBreadcrumbs({ breadcrumbs });
      }),
    );
  });

  readonly keepLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PageAction.keepLogin),
      mergeMap(() => {
        return this.userService.me().pipe(
          map(({ data }) => data),
          map((teacher) =>
            teacher
              ? ApiAction.autoLoginSuccessfully({ teacher })
              : ApiAction.autoLoginFailure(),
          ),
          catchError(() => of(ApiAction.autoLoginFailure())),
        );
      }),
    );
  });

  readonly logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PageAction.logout),
        tap(() => {
          this.authService.logOut().subscribe();
          this.tokenService.clear();
          void this.router.navigate(['/login']);
        }),
      );
    },
    { dispatch: false },
  );

  readonly autoLoginFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ApiAction.autoLoginFailure),
        mergeMap(() =>
          of({}).pipe(
            tap(() => {
              this.tokenService.clear();
              const path = this.location.path();
              this.redirectService.login(path);
            }),
          ),
        ),
      );
    },
    { dispatch: false },
  );

  readonly loadRooms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ApiAction.autoLoginSuccessfully),
      mergeMap(() => {
        return this.commonInfoService.getRooms().pipe(
          map((rooms) => ApiAction.loadRoomsSuccessfully({ rooms })),
          catchError(() => of(ApiAction.loadRoomsFailure())),
        );
      }),
    );
  });

  readonly loadSchoolYear$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ApiAction.autoLoginSuccessfully),
      mergeMap(() => {
        return this.commonInfoService
          .getCurrentTerm()
          .pipe(
            map((currentTerm) =>
              ApiAction.loadCurrentTermSuccessful({ currentTerm }),
            ),
          );
      }),
    );
  });

  readonly loadAcademicYear$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ApiAction.autoLoginSuccessfully),
      mergeMap(() => {
        return this.commonInfoService.getAcademicYear().pipe(
          map((academicYears) =>
            ApiAction.loadAcademicYearSuccessful({ academicYears }),
          ),
          catchError(() => of(ApiAction.loadAcademicYearFailure())),
        );
      }),
    );
  });

  readonly loadTeachersInDepartment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ApiAction.autoLoginSuccessfully),
      map(({ teacher }) => teacher.department?.id),
      ObservableHelper.filterNullish(),
      mergeMap((id) => {
        return this.teacherService.getByDepartment(id).pipe(
          map(({ data }) =>
            ApiAction.loadTeachersInDepartmentSuccessful({ teachers: data }),
          ),
          catchError(() => of(ApiAction.loadTeachersInDepartmentFailure())),
        );
      }),
    );
  });

  readonly loadGoogleCalendars = createEffect(() => {
    return this.actions$.pipe(
      ofType(ApiAction.autoLoginSuccessfully),
      filter(({ teacher }) => teacher.settings.googleCalendar),
      map(({ teacher }) => teacher.department?.id),
      ObservableHelper.filterNullish(),
      mergeMap((id) => {
        return this.googleService.getCalendarList(id).pipe(
          map(({ data }) =>
            ApiAction.loadGoogleCalendarSuccessful({ calendars: data }),
          ),
          catchError(() => of(ApiAction.loadGoogleCalendarFailure())),
        );
      }),
    );
  });

  // CONSTRUCTOR
  constructor() {}

  // PRIVATE METHODS
  private createBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url = '',
    breadcrumbs: BreadcrumbItem[] = [],
  ): BreadcrumbItem[] {
    const children = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeUrl = child.url.map(({ path }) => path).join('/');

      if (routeUrl !== '') {
        url += `/${routeUrl}`;
      }

      const label = child.data['breadcrumb'] as string;
      const group = child.data['group'] as string | undefined;
      if (
        label &&
        (breadcrumbs.length === 0 ||
          label !== breadcrumbs[breadcrumbs.length - 1].label)
      ) {
        breadcrumbs.push({ label, url, group });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return [];
  }
}
