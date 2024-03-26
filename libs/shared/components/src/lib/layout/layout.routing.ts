import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '403',
    loadChildren: async () =>
      (await import('../error/forbidden')).FORBIDDEN_ROUTES,
  },
  {
    path: '404',
    loadChildren: async () =>
      (await import('../error/not-found')).NOT_FOUND_ROUTES,
  },
];
