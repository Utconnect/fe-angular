import { GetAllShiftsData } from '@esm/api';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { combineLatest, map, Observable } from 'rxjs';

export type ShiftFilterFilterType = {
  methods: number[];
  date: TuiDayRange | null;
  shifts: number[];
};

export class EsmObservableHelper {
  static shiftFilterObservable(
    data$: Observable<GetAllShiftsData['data']>,
    filter$: Observable<ShiftFilterFilterType>,
  ): Observable<GetAllShiftsData['data']> {
    return combineLatest([data$, filter$]).pipe(
      map(([data, { methods, date, shifts }]) =>
        data.filter(({ shiftGroup }) => {
          const startAt = TuiDay.fromUtcNativeDate(
            new Date(shiftGroup.startAt),
          );
          return (
            // method
            (methods.length === 0 ||
              (shiftGroup.shift && methods.includes(shiftGroup.method))) &&
            // date
            (!date ||
              (date.from.daySameOrBefore(startAt) &&
                startAt.daySameOrBefore(date.to))) &&
            // shift
            (shifts.length === 0 ||
              (shiftGroup.shift && shifts.includes(shiftGroup.shift)))
          );
        }),
      ),
    );
  }
}
