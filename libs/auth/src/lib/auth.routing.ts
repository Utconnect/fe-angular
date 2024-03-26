import { Routes } from '@angular/router';
import { CHANGE_PASSWORD_ROUTES, LOGIN_ROUTES } from './components';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    children: LOGIN_ROUTES,
  },
  {
    path: 'change-password',
    children: CHANGE_PASSWORD_ROUTES,
  },
];
