import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, authProviders, AUTH_ROUTES } from '@auth';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';
import { TssAuthService } from '@tss/api';
import { TSS_CONFIG } from '@tss/config';
import { TssEffects, tssFeatureKey, tssReducer, TssState } from '@tss/store';
import {
  LayoutComponent,
  layoutProviders,
  LAYOUT_ROUTES,
} from '@utconnect/components';
import { TAIGA_PROVIDERS } from '@utconnect/utils';
import { RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { extModules } from './build-specifics';
import { topBarRightItemMapper } from './constants';
import {
  menuTextFactory,
  onLoginSuccess,
  roleFactory,
  tssSideBarItemsFactory,
  tssTopBarItemsFactory,
  userTitleFactory,
} from './factories';

const NGRX = [
  StoreModule.forRoot({ router: routerReducer }, {}),
  StoreModule.forFeature(tssFeatureKey, tssReducer),
  EffectsModule.forRoot([TssEffects]),
  StoreRouterConnectingModule.forRoot(),
];

const routes: Routes = [
  ...LAYOUT_ROUTES,
  ...AUTH_ROUTES,
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'calendar',
      },
      // {
      // path: 'admin',
      // canActivate: [permissionGuard],
      // data: {
      //   roles: [Role.ADMIN],
      //   breadcrumb: 'Admin',
      // },
      // loadChildren: async () =>
      //   (await import('@teaching-scheduling-system/web/admin/feature/shell'))
      //     .ShellModule,
      // },
      {
        path: 'calendar',
        data: {
          breadcrumb: 'Lịch biểu',
        },
        loadChildren: async () =>
          (await import('@teaching-scheduling-system/web/calendar/feature'))
            .CalendarModule,
      },
      // {
      //   path: 'schedule',
      //   data: {
      //     breadcrumb: 'Lịch giảng dạy',
      //   },
      // loadChildren: async () =>
      //   (
      //     await import(
      //       '@teaching-scheduling-system/web/teaching-schedule/feature/shell'
      //     )
      //   ).TeachingScheduleShellModule,
      // },
      // {
      //   path: 'exam',
      //   canActivate: [permissionGuard],
      //   data: {
      //     permissions: [PermissionConstant.ASSIGN_SCHEDULE],
      //     breadcrumb: 'Lịch thi',
      //   },
      // loadChildren: async () =>
      //   (await import('@teaching-scheduling-system/web/exam/feature/shell'))
      //     .ShellModule,
      // },
      // {
      //   path: 'statistic',
      //   canActivate: [permissionGuard],
      //   data: {
      //     breadcrumb: 'Thống kê',
      //   },
      // loadChildren: async () =>
      //   (
      //     await import(
      //       '@teaching-scheduling-system/web/statistic/feature/shell'
      //     )
      //   ).ShellModule,
      // },
      // {
      //   path: 'settings',
      //   data: {
      //     breadcrumb: 'Cài đặt',
      //   },
      // loadChildren: async () =>
      //   (
      //     await import(
      //       '@teaching-scheduling-system/web/settings/feature/shell'
      //     )
      //   ).ShellModule,
      // },
      // {
      //   path: 'feedback',
      //   data: {
      //     breadcrumb: 'Đóng góp ý kiến',
      //   },
      // loadChildren: async () =>
      //   (await import('@teaching-scheduling-system/web/feedback/feature'))
      //     .FeedbackModule,
      // },
      // {
      //   path: 'user-info',
      //   data: {
      //     breadcrumb: 'Thông tin cá nhân',
      //   },
      // loadChildren: async () =>
      //   (await import('@teaching-scheduling-system/web/user-info/feature'))
      //     .UserInfoModule,
      // },
      // {
      //   path: 'notifications',
      //   data: {
      //     breadcrumb: 'Thông báo',
      //   },
      // loadChildren: async () =>
      //   (await import('@teaching-scheduling-system/web/notification/feature'))
      //     .NotificationFeatureModule,
      // },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes), ...NGRX, ...extModules],
  exports: [RouterModule],
  providers: [
    TAIGA_PROVIDERS,
    authProviders({
      authService: TssAuthService,
      role: roleFactory,
      onLoginSuccess: onLoginSuccess,
      storage: 'localStorage',
      store: Store<TssState>,
      title: userTitleFactory,
    }),
    layoutProviders({
      store: Store<TssState>,
      sideBar: {
        items: tssSideBarItemsFactory,
        roles: roleFactory,
      },
      topBar: {
        items: tssTopBarItemsFactory,
        menuText: menuTextFactory,
        right: {
          mapper: topBarRightItemMapper,
        },
      },
    }),
    {
      provide: RECAPTCHA_SETTINGS,
      useFactory: (): { siteKey: string } => inject(TSS_CONFIG).recaptcha,
    },
  ],
})
export class TssShellFeatureModule {}
