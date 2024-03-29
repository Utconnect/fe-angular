import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarItem } from './side-bar.types';

export const SIDE_BAR_OPTION_ITEM_TOKEN = new InjectionToken<Observable<SidebarItem[]>>(
  '[Side bar] Option item',
);

export const SIDE_BAR_OPTION_AUTH_ROLES_TOKEN = new InjectionToken<
  Observable<string[]>
>('[Side bar] Roles');
