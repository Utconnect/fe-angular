import { Routes } from '@angular/router';
import { DataComponent } from './data.component';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DataComponent,
  },
  {
    path: '',
    loadChildren: async () =>
      (await import('./shared/wrapper/wrapper.routing')).ROUTES,
  },
];
