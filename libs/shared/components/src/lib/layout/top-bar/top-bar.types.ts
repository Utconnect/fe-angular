import { Type } from '@angular/core';
import { Store } from '@ngrx/store';

export type TopBarItem = {
  key: string;
  label?: string;
  routerLink?: string;
  icon: string;
  externalLink?: string;
  action?: (store: Store) => void;
};

export type TopBarGroup = {
  items: TopBarItem[];
};

export type TopBarItemMapper = (
  | {
      path: string;
      component: Type<unknown> | null;
    }
  | {
      paths: string[];
      component: Type<unknown> | null;
    }
)[];

export type TopBarRightItemProviderType = {
  mapper: TopBarItemMapper;
};
