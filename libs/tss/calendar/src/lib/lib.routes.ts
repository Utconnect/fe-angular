import { Route } from '@angular/router';

export const tssCalendarRoutes: Route[] = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./calendar.component')).TssCalendarComponent,
  },
];
