import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./settings.component')).SettingsComponent,
  },
];
