import { Route } from '@angular/router';
import { PermissionConstant } from '@tss/constants';
import { TssTeachingScheduleChangeComponent } from './change.component';

export const ROUTES: Route[] = [
  {
    path: '',
    component: TssTeachingScheduleChangeComponent,
    children: [
      {
        path: 'department',
        data: {
          title: 'Thay đổi lịch dạy bộ môn',
          permissions: [
            PermissionConstant.ACCEPT_CHANGE_TEACHING_SCHEDULE,
            PermissionConstant.MANAGE_ROOM,
          ],
          personal: false,
          breadcrumb: 'Bộ môn',
        },
        loadChildren: async () =>
          (await import('./change-request'))
            .TssTeachingScheduleChangeRequestComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        data: {
          title: 'Thay đổi lịch dạy cá nhân',
          permissions: [PermissionConstant.REQUEST_CHANGE_TEACHING_SCHEDULE],
          redirect: 'schedule/change/department',
          personal: true,
          breadcrumb: 'Cá nhân',
        },
        loadChildren: async () =>
          (await import('./change-request'))
            .TssTeachingScheduleChangeRequestComponent,
      },
    ],
  },
];
