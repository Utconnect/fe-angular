import { Routes } from '@angular/router';
import { DataWrapperComponent } from './wrapper.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: DataWrapperComponent,
    children: [
      {
        path: 'faculty',
        loadComponent: async () =>
          (await import('../../faculty/faculty.component'))
            .DataFacultyComponent,
      },
      {
        path: 'department',
        loadComponent: async () =>
          (await import('../../department/department.component'))
            .DataDepartmentComponent,
      },
      {
        path: 'invigilator',
        loadComponent: async () =>
          (await import('../../invigilator/invigilator.component'))
            .DataInvigilatorComponent,
      },
      {
        path: 'reset-password',
        loadComponent: async () =>
          (await import('../../reset-password/reset-password.component'))
            .DataResetPasswordComponent,
      },
    ],
  },
];
