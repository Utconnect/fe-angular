import { ComponentRouteMapper } from '@utconnect/types';

export type TopBarItem = {
  key: string;
  label?: string;
  routerLink?: string;
  icon: string;
  externalLink?: string;
  externalLinkFactory?: () => string;
  action?: () => void;
};

export type TopBarGroup = {
  items: TopBarItem[];
};

export type TopBarRightProviderType = {
  mapper: ComponentRouteMapper;
};
