import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TopBarGroup, TopBarRightItemProviderType } from './top-bar.types';

export const TOP_BAR_OPTION_ITEM_TOKEN = new InjectionToken<TopBarGroup[]>(
  '[Top bar] option item',
);

export const TOP_BAR_OPTION_MENU_TEXT_TOKEN = new InjectionToken<
  Observable<string | null>
>('[Top bar] option menu text');

export const TOP_BAR_OPTION_RIGHT_ITEM_TOKEN =
  new InjectionToken<TopBarRightItemProviderType>(
    '[Top bar] option right item',
  );
