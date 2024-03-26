import { Routes } from '@angular/router';

export const NOT_FOUND_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./not-found.component')).NotFoundComponent,
  },
];
