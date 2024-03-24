import { CanActivateFn, Route, Routes } from '@angular/router';

export type LayoutRouteType = {
  children: Routes | undefined;
  loginRoute: Route;
  canActivate: CanActivateFn[];
};
