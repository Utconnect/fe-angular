import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, authProviders, AUTH_ROUTES, permissionGuard } from '@auth';
import { EsmAuthService, ExaminationService, FacultyService } from '@esm/api';
import { ESM_CONFIG } from '@esm/config';
import { appReducer, EsmEffects, esmFeatureKey, EsmState } from '@esm/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';
import {
  LayoutComponent,
  layoutProviders,
  LAYOUT_ROUTES,
  requiredStepProviders,
} from '@utconnect/components';
import { TAIGA_PROVIDERS } from '@utconnect/utils';
import { RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { extModules } from './build-specifics';
import { topBarRightItemMapper } from './constants';
import {
  esmRequiredStepListFactory,
  esmRequiredStepStepFactory,
  esmSideBarItemsFactory,
  esmTopBarItemsFactory,
  menuTextFactory,
  onLoginSuccess,
  roleFactory,
  titleFactory,
} from './factories';
import { Role } from './roles';

const NGRX = [
  StoreModule.forRoot({ router: routerReducer }, {}),
  StoreModule.forFeature(esmFeatureKey, appReducer),
  EffectsModule.forRoot([EsmEffects]),
  StoreRouterConnectingModule.forRoot(),
];

const routes: Routes = [
  ...LAYOUT_ROUTES,
  ...AUTH_ROUTES,
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    data: {

    },
    children: [
      {
        path: '',
        loadChildren: async () => (await import('@esm/home')).ROUTES,
      },
      {
        path: 'create',
        canActivate: [permissionGuard],
        data: {
          roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
          isCreateMode: true,
        },
        loadChildren: async () =>
          (await import('@esm/examination')).EDIT_ROUTES,
      },
      {
        path: 'data',
        canActivate: [permissionGuard],
        data: {
          roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
        },
        loadChildren: async () => (await import('@esm/data')).ROUTES,
      },
      {
        path: 'settings',
        loadChildren: async () => (await import('@esm/settings')).ROUTES,
      },
      {
        path: ':examinationId',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadChildren: async () =>
              (await import('@esm/examination')).GENERAL_ROUTES,
          },
          {
            path: 'exam',
            children: [
              {
                path: '',
                canActivate: [permissionGuard],
                loadChildren: async () =>
                  (await import('@esm/examination')).EXAM_ROUTES,
              },
              {
                path: 'data',
                canActivate: [permissionGuard],
                data: {
                  roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
                },
                loadChildren: async () =>
                  (await import('@esm/examination')).DATA_ROUTES,
              },
              {
                path: 'handover',
                canActivate: [permissionGuard],
                data: {
                  roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
                },
                loadChildren: async () =>
                  (await import('@esm/examination')).HANDOVER_ROUTES,
              },
            ],
          },
          {
            path: 'invigilator',
            children: [
              {
                path: 'assign-faculty',
                canActivate: [permissionGuard],
                data: {
                  roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
                },
                loadChildren: async () =>
                  (await import('@esm/invigilator')).ASSIGN_FACULTY_ROUTES,
              },
              {
                path: 'assign-teacher',
                canActivate: [permissionGuard],
                loadChildren: async () =>
                  (await import('@esm/invigilator')).ASSIGN_TEACHER_ROUTES,
              },
              {
                path: 'assign-room',
                canActivate: [permissionGuard],
                data: {
                  roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
                },
                loadChildren: async () =>
                  (await import('@esm/invigilator')).ASSIGN_ROOM_ROUTES,
              },
            ],
          },
          {
            path: 'paid',
            children: [
              {
                path: 'invigilator',
                loadChildren: async () =>
                  (await import('@esm/paid')).INVIGILATOR_ROUTES,
              },
              {
                path: 'invigilator-department',
                loadChildren: async () =>
                  (await import('@esm/paid')).INVIGILATOR_DEPARTMENT_ROUTES,
              },
              {
                path: 'exam-department',
                loadChildren: async () =>
                  (await import('@esm/paid')).EXAM_DEPARTMENT_ROUTES,
              },
            ],
          },
          {
            path: 'process',
            loadChildren: async () =>
              (await import('@esm/examination')).PROCESS_ROUTES,
          },
          {
            path: 'report',
            loadChildren: async () =>
              (await import('@esm/examination')).REPORT_ROUTES,
          },
          {
            path: 'document',
            loadChildren: async () =>
              (await import('@esm/examination')).DOCUMENT_ROUTES,
          },
          {
            path: 'edit',
            canActivate: [permissionGuard],
            data: {
              roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
            },
            loadChildren: async () =>
              (await import('@esm/examination')).EDIT_ROUTES,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes), ...NGRX, ...extModules],
  exports: [RouterModule],
  providers: [
    TAIGA_PROVIDERS,
    authProviders({
      authService: EsmAuthService,
      role: roleFactory,
      onLoginSuccess: onLoginSuccess,
      storage: 'localStorage',
      store: Store<EsmState>,
      title: titleFactory,
    }),
    layoutProviders({
      store: Store<EsmState>,
      sideBar: {
        items: esmSideBarItemsFactory,
        roles: roleFactory,
      },
      topBar: {
        items: esmTopBarItemsFactory,
        menuText: menuTextFactory,
        right: {
          mapper: topBarRightItemMapper,
        },
      },
    }),
    requiredStepProviders({
      list: esmRequiredStepListFactory,
      step: esmRequiredStepStepFactory,
      store: Store<EsmState>,
    }),
    {
      provide: RECAPTCHA_SETTINGS,
      useFactory: (): { siteKey: string } => inject(ESM_CONFIG).recaptcha,
    },
    ExaminationService,
    FacultyService,
  ],
})
export class EsmShellFeatureModule {}
