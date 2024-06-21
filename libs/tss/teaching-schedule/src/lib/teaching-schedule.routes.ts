import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./calendar.component')).TssCalendarComponent,
  },
];
