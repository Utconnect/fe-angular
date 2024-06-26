import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LetModule } from '@ngrx/component';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiDialogContext,
  TuiErrorModule,
  TuiNotification,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputDateTimeModule,
  TuiInputModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { FormConstant } from '@tss/constants';
import { DateHelper } from '@utconnect/helpers';
import { TssExamModel } from '@utconnect/types';
import { differentValueValidator } from '@utconnect/validators';
import { map, of, switchMap } from 'rxjs';
import { ExamDialogStore } from './exam-dialog.store';

const TAIGA_UI = [
  TuiButtonModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiInputDateTimeModule,
  TuiInputModule,
  TuiTextAreaModule,
];

@Component({
  selector: 'tss-exam-dialog',
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, LetModule, ...TAIGA_UI],
  providers: [ExamDialogStore],
})
export class TssExamDialogComponent {
  // INJECTIONS
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(ExamDialogStore);
  private readonly alertService = inject(TuiAlertService);
  private readonly context =
    inject<TuiDialogContext<string, TssExamModel>>(POLYMORPHEUS_CONTEXT);

  // PUBLIC PROPERTIES
  readonly notAllowFieldHint = 'Không thể thay đổi thông tin của lịch thi';
  readonly noteMaxLength = FormConstant.NOTE_MAX_LENGTH;
  readonly showLoader$ = this.store.status$.pipe(map((s) => s === 'loading'));
  form!: FormGroup;

  // PRIVATE PROPERTIES
  private needUpdateAfterClose = false;

  // GETTERS
  private get idControl(): FormControl {
    return this.form.controls['id'] as FormControl;
  }

  get peopleControl(): FormArray {
    return this.form.controls['people'] as FormArray;
  }

  get changeControl(): FormGroup {
    return this.form.controls['change'] as FormGroup;
  }

  private get noteControl(): FormControl {
    return this.changeControl.controls['note'] as FormControl;
  }

  // CONSTRUCTOR
  constructor() {
    this.initForm(this.context.data);
    this.handleSubmitStatus();
  }

  // PUBLIC METHODS
  submit(): void {
    this.store.submit({
      id: this.idControl.value,
      note: this.noteControl.value,
    });
  }

  onCancel(): void {
    setTimeout(() => {
      if (this.needUpdateAfterClose) {
        this.context.completeWith(this.noteControl.value);
      } else {
        this.context.$implicit.complete();
      }
    });
  }

  // PRIVATE METHODS
  private initForm(data: TssExamModel): void {
    const startDate = data.StartTime as Date;
    const endDate = data.EndTime as Date;
    const today = new Date();
    const startTuiDate = startDate
      ? DateHelper.toTuiDay(startDate)
      : DateHelper.toTuiDay(today);
    const endTuiDate = endDate
      ? DateHelper.toTuiDay(endDate)
      : DateHelper.toTuiDay(today);

    const initialChange = {
      note: data.Note ?? '',
    };

    this.form = this.fb.group({
      id: [data.Id],
      subject: [data.Subject],
      location: [data.Location],
      method: [data.Method],
      people: this.fb.array(data.People.map((x) => this.fb.control(x)) ?? []),
      start: [[startTuiDate, DateHelper.beautifyTime(startDate ?? today)]],
      end: [[endTuiDate, DateHelper.beautifyTime(endDate ?? today)]],
      change: this.fb.group(
        {
          note: [initialChange.note, Validators.maxLength(this.noteMaxLength)],
        },
        { validators: differentValueValidator(initialChange) },
      ),
    });
  }

  private handleSubmitStatus(): void {
    this.store.status$
      .pipe(
        switchMap((status) => {
          if (status === 'success') {
            this.needUpdateAfterClose = true;
            this.changeControl.setValidators(
              differentValueValidator(this.changeControl.value),
            );
            this.changeControl.updateValueAndValidity();
            return this.alertService.open('Cập nhật lịch thi thành công!', {
              status: TuiNotification.Success,
            });
          }
          if (status === 'error') {
            return this.alertService.open('Vui lòng thử lại sau', {
              label: 'Đã có lỗi xảy ra',
              status: TuiNotification.Error,
            });
          }
          return of({});
        }),
      )
      .subscribe();
  }
}
