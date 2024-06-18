import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { CalendarEffects, calendarFeatureKey, calendarReducer } from './store';

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./calendar.component')).TssCalendarComponent,
    providers: [
      provideState(calendarFeatureKey, calendarReducer),
      provideEffects(CalendarEffects),
    ],
  },
];
