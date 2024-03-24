import { Routes } from '@angular/router';
import { LayoutRouteType } from './layout.types';

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

export const useLayoutRoutes = ({
  children,
  loginRoute,
  canActivate,
}: LayoutRouteType): Routes => [
  ...LAYOUT_ROUTES,
  loginRoute,
  {
    children,
    canActivate,
    path: '',
    loadComponent: async () =>
      (await import('./layout.component')).LayoutComponent,
  },
  {
    path: '**',
    loadChildren: async () =>
      (await import('../error/not-found')).NOT_FOUND_ROUTES,
  },
];
