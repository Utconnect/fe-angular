import { Routes } from '@angular/router';

export const EDIT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./edit.component')).ExaminationEditComponent,
  },
];
