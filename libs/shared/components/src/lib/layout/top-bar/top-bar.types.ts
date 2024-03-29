import { Store } from '@ngrx/store';
import { ComponentRouteMapper } from '@utconnect/types';

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

export type TopBarRightItemProviderType = {
  mapper: ComponentRouteMapper;
};
