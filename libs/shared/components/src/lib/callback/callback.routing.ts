import { Routes } from '@angular/router';

export const CALLBACK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./callback.component')).CallbackComponent,
  },
];
