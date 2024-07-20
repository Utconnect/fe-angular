import {
  ChangeDetectorRef,
  Directive,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiDayRange, TuiDestroyService } from '@taiga-ui/cdk';
import { ChangeSchedule, ExportService, Teacher } from '@tss/api';
import { TssSelector, TssState } from '@tss/store';
import { FileType } from '@tss/types';
import { map, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
import { TssStatisticChangeScheduleStore } from '../../store';

@Directive({
  selector: '[tssStatisticChangeScheduleFilterExport]',
  standalone: true,
  providers: [TuiDestroyService],
})
export class TssStatisticChangeScheduleFilterExportDirective {
  // INJECTIONS
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly appStore = inject(Store<TssState>);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly exportService = inject(ExportService);
  private readonly store = inject(TssStatisticChangeScheduleStore);

  // INPUT
  @Input('tssStatisticChangeScheduleFilterExport')
  rangeControl!: AbstractControl;

  // PUBLIC PROPERTIES
  readonly export$ = new Subject<void>();

  // PRIVATE PROPERTIES
  private readonly teacher$ = this.appStore.pipe(
    TssSelector.notNullTeacher,
    takeUntil(this.destroy$),
  );
  private readonly data$ = this.store.data$;

  // GETTERS
  private get rangeControlValue(): TuiDayRange {
    return this.rangeControl.value as TuiDayRange;
  }

  // CONSTRUCTOR
  constructor() {
    this.handleExport();
  }

  // HOST LISTENER
  @HostListener('click') onClick(): void {
    this.export$.next();
  }

  // PRIVATE METHODS

  private handleExport(): void {
    this.export$
      .pipe(
        withLatestFrom(this.data$, this.teacher$),
        map(({ 1: changeSchedules, 2: teacher }) => ({
          changeSchedules,
          teacher,
        })),
        tap(({ changeSchedules, teacher }) =>
          this.export(changeSchedules, teacher),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private export(changeSchedules: ChangeSchedule[], teacher: Teacher): void {
    const range = this.rangeControlValue;
    const rangeOptions = {
      sameMonth: range.from.monthSame(range.to),
      inOneYear:
        range.from.month === 0 &&
        range.from.day === 1 &&
        range.to.month === 11 &&
        range.to.day === 31,
    };
    const document = this.exportService.exportChangeScheduleStatistic(
      changeSchedules,
      teacher,
      range,
      rangeOptions,
    );

    const commonName = 'Thay-doi-lich-giang';
    const rangeText = this.getRangeText(rangeOptions);
    const fileName = `${teacher.department?.id}_${commonName}_${rangeText}.docx`;

    this.exportService.exportBlob({
      document,
      name: fileName,
      mimeType: FileType.WORD,
    });

    this.cdr.markForCheck();
  }

  private getRangeText(rangeOptions: { sameMonth: boolean, inOneYear: boolean }): string {
    const range = this.rangeControlValue;
    if (rangeOptions.sameMonth) {
      return `thang${range.from.month + 1}_${range.from.year}`;
    }
    if (rangeOptions.inOneYear) {
      return range.from.year.toString();
    }
    return `${range.from.formattedDayPart}${range.from.formattedMonthPart}${range.from.formattedYear}_${range.to.formattedDayPart}${range.to.formattedMonthPart}${range.to.formattedYear}`;
  }
}
