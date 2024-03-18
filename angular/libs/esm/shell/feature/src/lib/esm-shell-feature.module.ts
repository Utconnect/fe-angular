import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { inject, LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { TUI_IS_CYPRESS } from '@taiga-ui/cdk';
import {
  TUI_ANIMATIONS_DURATION,
  TUI_HINT_DEFAULT_OPTIONS,
  TUI_HINT_OPTIONS,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { TUI_LANGUAGE, TUI_VIETNAMESE_LANGUAGE } from '@taiga-ui/i18n';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { ESM_CONFIG } from '@esm/config';
import { authGuard } from '@utconnect/guards';

// import {
//   PermissionConstant,
//   RoleConstant,
// } from '@teaching-scheduling-system/core/data-access/constants';
// import {
//   beforeTodayFactory,
//   maxLengthFactory,
//   notContainValueFactory,
//   requiredFactory,
// } from '@teaching-scheduling-system/core/utils/factories';
// import { ContentTypeInterceptor } from '@teaching-scheduling-system/core/utils/interceptors';
// import { TokenService } from '@teaching-scheduling-system/web/shared/data-access/services';
// import {
//   KeepUserGuard,
//   MaintenanceGuard,
//   PermissionGuard,
// } from '@teaching-scheduling-system/web/shared/utils/guards';
// import { AuthInterceptor } from '@teaching-scheduling-system/web/shared/utils/interceptors';
// import {
//   LayoutComponent,
//   LayoutModule,
// } from '@teaching-scheduling-system/web/shell/ui/layout';
// import { NavbarService } from '@teaching-scheduling-system/web/shell/ui/navbar';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { of } from 'rxjs';
import { extModules } from './build-specifics';
import {
  AuthService,
  TokenService,
  authServiceProvider,
} from '@utconnect/services';
import { loginProvider } from '@utconnect/components';
import { AppEffects, appFeatureKey, appReducer } from '@esm/store';
import { EsmAuthService } from '@esm/api';

const NGRX = [
  StoreModule.forRoot({ router: routerReducer }, {}),
  StoreModule.forFeature(appFeatureKey, appReducer),
  EffectsModule.forRoot([AppEffects]),
  StoreRouterConnectingModule.forRoot(),
];

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [authGuard],
    loadComponent: async () =>
      (await import('@utconnect/components')).LoginComponent,
  },
  // {
  //   path: '403',
  //   loadChildren: async () =>
  //     (await import('./error/forbidden/forbidden.routing')).ROUTES,
  // },
  // {
  //   path: '404',
  //   loadChildren: async () =>
  //     (await import('./error/not-found/not-found.routing')).ROUTES,
  // },
  // {
  //   path: '',
  //   canActivate: [authGuard],
  //   component: LayoutComponent,
  //   providers: [
  //     importProvidersFrom(
  //       StoreModule.forFeature(notificationFeatureKey, notificationReducer),
  //       EffectsModule.forFeature([NotificationEffects])
  //     ),
  //   ],
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: async () => (await import('./home/home.routing')).ROUTES,
  //     },
  //     {
  //       path: 'create',
  //       canActivate: [permissionGuard],
  //       data: {
  //         roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  //         isCreateMode: true,
  //       },
  //       loadChildren: async () =>
  //         (await import('./examination/edit/edit.routing')).ROUTES,
  //     },
  //     {
  //       path: 'data',
  //       canActivate: [permissionGuard],
  //       data: {
  //         roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  //       },
  //       loadChildren: async () => (await import('./data/data.routing')).ROUTES,
  //     },
  //     {
  //       path: 'notification',
  //       loadChildren: async () =>
  //         (await import('./notification/notification.routing')).ROUTES,
  //     },
  //     {
  //       path: 'settings',
  //       loadChildren: async () =>
  //         (await import('./settings/settings.routing')).ROUTES,
  //     },
  //     {
  //       path: ':examinationId',
  //       canActivate: [authGuard],
  //       children: [
  //         {
  //           path: '',
  //           loadChildren: async () =>
  //             (await import('./examination/general/general.routing')).ROUTES,
  //         },
  //         {
  //           path: 'exam',
  //           children: [
  //             {
  //               path: '',
  //               canActivate: [permissionGuard],
  //               loadChildren: async () =>
  //                 (await import('./examination/exam/exam.routing')).ROUTES,
  //             },
  //             {
  //               path: 'data',
  //               canActivate: [permissionGuard],
  //               data: {
  //                 roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  //               },
  //               loadChildren: async () =>
  //                 (await import('./examination/data/data.routing')).ROUTES,
  //             },
  //             {
  //               path: 'handover',
  //               canActivate: [permissionGuard],
  //               data: {
  //                 roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  //               },
  //               loadChildren: async () =>
  //                 (await import('./examination/handover/handover.routing'))
  //                   .ROUTES,
  //             },
  //           ],
  //         },
  //         {
  //           path: 'invigilator',
  //           children: [
  //             {
  //               path: 'assign-faculty',
  //               canActivate: [permissionGuard],
  //               data: {
  //                 roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  //               },
  //               loadChildren: async () =>
  //                 (
  //                   await import(
  //                     './invigilator/assign-faculty/assign-faculty.routing'
  //                   )
  //                 ).ROUTES,
  //             },
  //             {
  //               path: 'assign-teacher',
  //               canActivate: [permissionGuard],
  //               loadChildren: async () =>
  //                 (
  //                   await import(
  //                     './invigilator/assign-teacher/assign-teacher.routing'
  //                   )
  //                 ).ROUTES,
  //             },
  //             {
  //               path: 'assign-room',
  //               canActivate: [permissionGuard],
  //               data: {
  //                 roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  //               },
  //               loadChildren: async () =>
  //                 (
  //                   await import(
  //                     './invigilator/assign-room/assign-room.routing'
  //                   )
  //                 ).ROUTES,
  //             },
  //           ],
  //         },
  //         {
  //           path: 'paid',
  //           children: [
  //             {
  //               path: 'invigilator',
  //               loadChildren: async () =>
  //                 (await import('./paid/invigilator/invigilator.routing'))
  //                   .ROUTES,
  //             },
  //             {
  //               path: 'invigilator-department',
  //               loadChildren: async () =>
  //                 (
  //                   await import(
  //                     './paid/invigilator-department/invigilator-department.routing'
  //                   )
  //                 ).ROUTES,
  //             },
  //             {
  //               path: 'exam-department',
  //               loadChildren: async () =>
  //                 (
  //                   await import(
  //                     './paid/exam-department/exam-department.routing'
  //                   )
  //                 ).ROUTES,
  //             },
  //           ],
  //         },
  //         {
  //           path: 'process',
  //           loadChildren: async () =>
  //             (await import('./examination/process/process.routing')).ROUTES,
  //         },
  //         {
  //           path: 'report',
  //           loadChildren: async () =>
  //             (await import('./examination/report/report.routing')).ROUTES,
  //         },
  //         {
  //           path: 'document',
  //           loadChildren: async () =>
  //             (await import('./examination/document/document.routing')).ROUTES,
  //         },
  //         {
  //           path: 'edit',
  //           canActivate: [permissionGuard],
  //           data: {
  //             roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  //           },
  //           loadChildren: async () =>
  //             (await import('./examination/edit/edit.routing')).ROUTES,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    // LayoutModule,
    ...NGRX,
    ...extModules,
  ],
  exports: [RouterModule],
  providers: [
    authServiceProvider({
      authService: EsmAuthService,
      storage: 'localStorage',
    }),
    {
      provide: RECAPTCHA_SETTINGS,
      useFactory: (): { siteKey: string } => inject(ESM_CONFIG).recaptcha,
    },
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_VIETNAMESE_LANGUAGE),
    },
    // {
    //   provide: TUI_VALIDATION_ERRORS,
    //   useValue: {
    //     required: requiredFactory,
    //     email: emailFactory,
    //     duplicated: duplicatedFactory,
    //   },
    // },
    {
      provide: TUI_ANIMATIONS_DURATION,
      useFactory: (): number => (inject(TUI_IS_CYPRESS) ? 0 : 300),
    },
  ],
})
export class EsmShellFeatureModule {}
