import { Routes } from '@angular/router';
import { LayoutRouteType } from './layout.types';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '403',
    loadComponent: async () =>
      (await import('../error/forbidden')).ForbiddenComponent,
  },
  {
    path: '404',
    loadComponent: async () =>
      (await import('../error/not-found')).NotFoundComponent,
  },
];

export const useLayoutRoutes = ({
  children,
  loginRoute,
}: LayoutRouteType): Routes => [
  ...LAYOUT_ROUTES,
  loginRoute,
  {
    children,
    path: '',
    // canActivate: [authGuard],
    loadComponent: async () =>
      (await import('./layout.component')).LayoutComponent,
  },
  {
    path: '**',
    loadComponent: async () =>
      (await import('../error/not-found')).NotFoundComponent,
  },
];
