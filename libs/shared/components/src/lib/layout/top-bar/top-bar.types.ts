type TopBarItem = {
  key: string;
  label?: string;
  routerLink?: string;
  icon: string;
  externalLink?: string;
  action?: () => void;
};

export type TopBarGroup = {
  items: TopBarItem[];
};
