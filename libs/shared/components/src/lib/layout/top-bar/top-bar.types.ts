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
