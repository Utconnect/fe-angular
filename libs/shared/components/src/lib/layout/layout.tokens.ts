import { InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';

export const LAYOUT_OPTION_STORE_TOKEN = new InjectionToken<Store>(
  'Layout option store',
);
