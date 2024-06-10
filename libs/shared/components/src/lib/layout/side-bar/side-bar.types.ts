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
  subCheckboxes?: {
    controlName: string;
    name: string;
  }[];
  roles?: string[];
  externalLink?: string;
  exactRouterLink?: boolean;
};
