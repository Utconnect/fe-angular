import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiDay, TuiDestroyService, TuiFilterPipeModule } from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiSelectModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { Teacher } from '@tss/api';
import { FormConstant } from '@tss/constants';
import { ShiftConstant } from '@utconnect/constants';
import { DateHelper } from '@utconnect/helpers';
import { FilterByInputPipe } from '@utconnect/pipes';
import { SimpleModel } from '@utconnect/types';
import { map, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
import { TssTeachingDialogStore } from '../../store';
import { TssTeachingDialogContentDuplicateCheckerComponent } from '../duplicate-checker';
import { TssTeachingDialogShiftPipe } from '../shift-pipe';

const TAIGA_UI = [
  TuiComboBoxModule,
  TuiDataListModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiFilterPipeModule,
  TuiInputDateModule,
  TuiSelectModule,
  TuiTextAreaModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'tss-teaching-dialog-request-change',
  templateUrl: './teaching-dialog-request-change.component.html',
  styleUrls: ['./teaching-dialog-request-change.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FilterByInputPipe,
    TssTeachingDialogShiftPipe,
    TssTeachingDialogContentDuplicateCheckerComponent,
    ...TAIGA_UI,
  ],
  providers: [TuiDestroyService],
})
export class TssTeachingDialogRequestChangeComponent implements OnInit {
  // INJECTIONS
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly store = inject(TssTeachingDialogStore);
  private readonly controlContainer = inject(ControlContainer);

  // INPUT
  @Input() isPersonal!: boolean;
  @Input() people?: string[] | SimpleModel[];

  // PUBLIC PROPERTIES
  form!: FormGroup;

  readonly rooms$ = this.store.rooms$;
  readonly changeRequest$ = new Subject<void>();
  readonly shiftKeys = Object.keys(ShiftConstant.SHIFTS);
  readonly FormConstant = FormConstant;

  // PRIVATE PROPERTIES
  private readonly teacher$ = this.store.teacher$;

  readonly roomMatcher = (item: string): boolean => item !== 'PTTT';

  // GETTERS
  private get shiftControlValue(): string {
    return this.form.controls['shift'].value as string;
  }

  private get dateControlValue(): TuiDay {
    return this.form.controls['date'].value as TuiDay;
  }

  // CONSTRUCTOR
  constructor() {
    this.handleChangeRequest();
  }

  // LIFECYCLE
  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
  }

  // PRIVATE METHODS
  private handleChangeRequest(): void {
    this.changeRequest$
      .pipe(
        withLatestFrom(this.teacher$),
        map(({ 1: teacher }) => teacher),
        tap((teacher) => {
          if (this.form.errors?.['sameValue'] || !this.dateControlValue) {
            return;
          }

          const date = DateHelper.toDateOnlyString(
            this.dateControlValue.toUtcNativeDate(),
          );
          const payload = {
            date: [date, date].join(),
            shift:
              this.shiftControlValue[0] === '5'
                ? ['5_1', '5_2'].join()
                : this.shiftControlValue,
          };
          const teacherId =
            (this.isPersonal
              ? teacher?.id
              : (this.people?.[0] as Teacher).id) || '';

          this.store.search({ payload, teacherId });
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
