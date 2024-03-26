import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./settings.component')).SettingsComponent,
  },
  {
    path: 'change-password',
    loadChildren: async () => (await import('@auth')).CHANGE_PASSWORD_ROUTES,
  },
];
