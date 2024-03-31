import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EsmStringHelper } from '@esm/helpers';
import { EsmExamMethodPipe } from '@esm/pipes';
import { LetModule } from '@ngrx/component';
import {
  TuiDay,
  TuiDayRange,
  TUI_FIRST_DAY,
  TUI_LAST_DAY,
} from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiInputDateRangeModule,
  TuiMultiSelectModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { map, tap } from 'rxjs';
import { ExaminationDataFinalStore } from '../final.store';

export const TAIGA_UI = [
  TuiDataListModule,
  TuiInputDateRangeModule,
  TuiMultiSelectModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'esm-examination-data-final-header',
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    ReactiveFormsModule,
    PolymorpheusModule,
    EsmExamMethodPipe,
    ...TAIGA_UI,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationDataFinalHeaderComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(ExaminationDataFinalStore);

  readonly shifts = [1, 2, 3, 4];
  readonly methods = Object.keys(EsmStringHelper.EXAM_METHOD_MAPPING).map(
    (k) => +k,
  );
  readonly form = this.fb.group({
    methods: [[]],
    date: [null as TuiDayRange | null],
    shifts: [[]],
  });
  readonly shiftContentContext!: { $implicit: number[] };
  readonly methodContentContext!: { $implicit: number[] };
  readonly minMaxDate$ = this.store.data$.pipe(
    map((data) =>
      data.length
        ? {
            min: TuiDay.fromUtcNativeDate(new Date(data[0].shiftGroup.startAt)),
            max: TuiDay.fromUtcNativeDate(
              new Date(data[data.length - 1].shiftGroup.startAt),
            ),
          }
        : { min: TUI_FIRST_DAY, max: TUI_LAST_DAY },
    ),
  );

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        tap(() => {
          const filter = this.form.getRawValue();
          this.store.patchState({ filter });
        }),
      )
      .subscribe();
  }
}
