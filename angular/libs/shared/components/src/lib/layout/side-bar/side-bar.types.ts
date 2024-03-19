export type SidebarItem = {
  name: string;
  icon: string;
  routerLink?: string;
  subItems?: {
    name: string;
    routerLink: string;
    icon: string;
    roles?: string[];
  }[];
  roles?: string[];
  externalLink?: string;
  exactRouterLink?: boolean;
};
