import { Type } from '@angular/core';

export type SidebarItem = {
  name: string;
  controlName?: string;
  icon: string;
  routerLink?: string;
  subItems?: {
    name: string;
    routerLink: string;
    icon: string;
    roles?: string[];
  }[];
  component?: () => Promise<Type<unknown>>;
  roles?: string[];
  externalLink?: string;
  exactRouterLink?: boolean;
};
