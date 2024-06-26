import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    data: {
      title: 'Thống kê thay đổi giờ giảng',
      breadcrumb: 'Thay đổi giờ giảng',
    },
    loadChildren: async () =>
      (await import('./change-schedule')).TssStatisticChangeScheduleComponent,
  },
];
