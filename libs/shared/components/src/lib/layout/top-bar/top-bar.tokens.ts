import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TopBarGroup } from './top-bar.types';

export type TopBarOptions = {
  items: TopBarGroup[];
  menuText?: string;
};

export const TOP_BAR_OPTION_ITEM_TOKEN = new InjectionToken<
  TopBarOptions['items']
>('Top bar option item');

export const TOP_BAR_OPTION_MENU_TEXT_TOKEN = new InjectionToken<
  Observable<TopBarOptions['menuText']>
>('Top bar option menu text');
