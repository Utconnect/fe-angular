import { Routes } from '@angular/router';

export const FORBIDDEN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./forbidden.component')).ForbiddenComponent,
  },
];
