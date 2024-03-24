import { InjectionToken } from '@angular/core';
import { SidebarItem } from './side-bar.types';

export type SideBarOptions = {
  items: SidebarItem[];
};

export const SIDE_BAR_OPTIONS_TOKEN = new InjectionToken<SideBarOptions>(
  'Side bar options',
);
