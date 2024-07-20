import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiDayRange } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogContext,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChangeSchedule, ExportService, Teacher } from '@tss/api';
import { FileType } from '@tss/types';
import { DateHelper, ObservableHelper, StringHelper } from '@utconnect/helpers';
import { map, Subject, tap, withLatestFrom } from 'rxjs';
import { TssChangeReportDialogStore } from './store';

const TAIGA_UI = [TuiButtonModule];

@Component({
  selector: 'tss-change-report-dialog-details',
  templateUrl: './change-report-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ...TAIGA_UI],
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'primary',
      size: 'm',
    }),
  ],
})
export class TssChangeReportDialogComponent {
  // INJECTIONS
  private readonly fb = inject(FormBuilder);
  private readonly exportService = inject(ExportService);
  private readonly store = inject(TssChangeReportDialogStore);
  public readonly context =
    inject<TuiDialogContext<void, ChangeSchedule>>(POLYMORPHEUS_CONTEXT);

  // PUBLIC PROPERTIES
  form!: FormGroup;
  readonly status$ = this.store.status$;
  readonly confirm$ = new Subject<void>();

  // GETTERS
  private get rangeControlValue(): TuiDayRange {
    return this.form.controls['range'].value as TuiDayRange;
  }

  // PRIVATE PROPERTIES
  private readonly teacher$ = this.store.teacher$;

  // CONSTRUCTOR
  constructor() {
    this.initForm();
    this.handleConfirm();
    this.handleReceiveData();
  }

  // PRIVATE METHODS
  private initForm(): void {
    this.form = this.fb.group({
      range: [DateHelper.getPreviousMonthRange(), Validators.required],
    });
  }

  private handleConfirm(): void {
    this.confirm$
      .pipe(
        withLatestFrom(this.teacher$.pipe(map(({ id }) => id))),
        tap(({ 1: teacherId }) => {
          this.store.getPersonalChangeScheduleRequests({
            range: this.rangeControlValue,
            teacherId,
          });
        }),
      )
      .subscribe();
  }

  private handleReceiveData(): void {
    this.store.data$
      .pipe(
        ObservableHelper.filterNullish(),
        withLatestFrom(this.teacher$),
        tap(([data, teacher]) => this.export(data, teacher)),
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
    const document = this.exportService.exportPersonalChangeScheduleStatistic(
      changeSchedules,
      teacher,
      range,
      rangeOptions,
    );

    const commonName = 'Thay-doi-lich-giang';
    const teacherName = StringHelper.toLatinText(teacher.name)
      .split(' ')
      .join('-');
    const rangeText = this.getRangeText(rangeOptions);
    const fileName = `${commonName}_${teacherName}_${rangeText}.docx`;

    this.exportService.exportBlob({
      document,
      name: fileName,
      mimeType: FileType.WORD,
    });
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
