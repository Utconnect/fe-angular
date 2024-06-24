import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authProviders } from '@auth';
import { provideEffects } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { provideState, provideStore, Store } from '@ngrx/store';
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
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { extModules } from './build-specifics';
import { topBarRightItemMapper } from './constants';
import { dbConfig } from './db-config';
import {
  menuTextFactory,
  onLoginSuccess,
  roleFactory,
  tssSidebarItemsFactory,
  tssTopBarItemsFactory,
  userTitleFactory,
} from './factories';

const NGRX = [StoreRouterConnectingModule.forRoot()];

const routes: Routes = [
  ...LAYOUT_ROUTES,
  {
    path: '',
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
        loadChildren: async () => (await import('@tss/calendar')).ROUTES,
      },
      {
        path: 'schedule',
        data: {
          breadcrumb: 'Lịch giảng dạy',
        },
        loadChildren: async () =>
          (await import('@tss/teaching-schedule')).ROUTES,
      },
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
      // MOBILE MENU
      {
        path: 'calendar',
        data: {
          breadcrumb: 'Lịch biểu',
        },
        loadComponent: async () =>
          (await import('@tss/calendar')).TssCalendarMobileMenuComponent,
        outlet: 'mobile-menu',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    NgxIndexedDBModule.forRoot(dbConfig),
    ...NGRX,
    ...extModules,
  ],
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
      sidebar: {
        items: tssSidebarItemsFactory,
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
    provideStore(),
    provideState(tssFeatureKey, tssReducer),
    provideEffects(TssEffects),
  ],
})
export class TssShellFeatureModule {}
