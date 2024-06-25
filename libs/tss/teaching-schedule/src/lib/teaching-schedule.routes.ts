import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: 'assign',
    loadComponent: async () =>
      (await import('./assign')).TssTeachingScheduleAssignComponent,
  },
  {
    path: 'change',
    children: (await import('./change')).ROUTES,
  },
];
