import { Type } from '@angular/core';

export type ComponentRouteMapper = (
  | {
      path: string;
      component: Type<unknown> | null;
    }
  | {
      paths: string[];
      component: Type<unknown> | null;
    }
)[];
