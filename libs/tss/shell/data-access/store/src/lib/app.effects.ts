import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import {
  BreadcrumbItem,
  CommonInfoService,
  GoogleService,
  TeacherService,
  UserService,
} from '@tss/api';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TssApiAction } from './app.api.actions';
import { TssPageAction } from './app.page.actions';

@Injectable()
export class TssEffects {
  // INJECT PROPERTIES
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);
  private readonly googleService = inject(GoogleService);
  private readonly teacherService = inject(TeacherService);
  private readonly commonInfoService = inject(CommonInfoService);

  // EFFECTS
  readonly getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TssPageAction.getUserInfo),
      mergeMap(() => {
        return this.userService.me().pipe(
          map(({ data }) =>
            TssApiAction.getUserInfoSuccessfully({ teacher: data }),
          ),
          catchError(() => of(TssApiAction.getUserInfoFailure())),
        );
      }),
    );
  });

  readonly changeRouter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      map(({ payload }) => {
        const breadcrumbs = this.createBreadcrumbs(payload.routerState.root);
        return TssApiAction.updateBreadcrumbs({ breadcrumbs });
      }),
    );
  });

  // readonly loadRooms$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TssApiAction.getUserInfoSuccessfully),
  //     mergeMap(() => {
  //       return this.commonInfoService.getRooms().pipe(
  //         map((rooms) => TssApiAction.loadRoomsSuccessfully({ rooms })),
  //         catchError(() => of(TssApiAction.loadRoomsFailure())),
  //       );
  //     }),
  //   );
  // });
  //
  // readonly loadSchoolYear$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TssApiAction.getUserInfoSuccessfully),
  //     mergeMap(() => {
  //       return this.commonInfoService
  //         .getCurrentTerm()
  //         .pipe(
  //           map((currentTerm) =>
  //             TssApiAction.loadCurrentTermSuccessful({ currentTerm }),
  //           ),
  //         );
  //     }),
  //   );
  // });
  //
  // readonly loadAcademicYear$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TssApiAction.getUserInfoSuccessfully),
  //     mergeMap(() => {
  //       return this.commonInfoService.getAcademicYear().pipe(
  //         map((academicYears) =>
  //           TssApiAction.loadAcademicYearSuccessful({ academicYears }),
  //         ),
  //         catchError(() => of(TssApiAction.loadAcademicYearFailure())),
  //       );
  //     }),
  //   );
  // });
  //
  // readonly loadTeachersInDepartment$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TssApiAction.getUserInfoSuccessfully),
  //     map(({ teacher }) => teacher.department?.id),
  //     ObservableHelper.filterNullish(),
  //     mergeMap((id) => {
  //       return this.teacherService.getByDepartment(id).pipe(
  //         map(({ data }) =>
  //           TssApiAction.loadTeachersInDepartmentSuccessful({ teachers: data }),
  //         ),
  //         catchError(() => of(TssApiAction.loadTeachersInDepartmentFailure())),
  //       );
  //     }),
  //   );
  // });

  // readonly loadGoogleCalendars = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TssApiAction.getUserInfoSuccessfully),
  //     filter(({ teacher }) => teacher.settings.googleCalendar),
  //     map(({ teacher }) => teacher.department?.id),
  //     ObservableHelper.filterNullish(),
  //     mergeMap((id) => {
  //       return this.googleService.getCalendarList(id).pipe(
  //         map(({ data }) =>
  //           TssApiAction.loadGoogleCalendarSuccessful({ calendars: data }),
  //         ),
  //         catchError(() => of(TssApiAction.loadGoogleCalendarFailure())),
  //       );
  //     }),
  //   );
  // });

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
