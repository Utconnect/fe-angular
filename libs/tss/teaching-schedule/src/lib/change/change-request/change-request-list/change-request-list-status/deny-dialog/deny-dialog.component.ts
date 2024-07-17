import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiAppearance,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogContext,
  TUI_TEXTFIELD_APPEARANCE,
} from '@taiga-ui/core';
import { TuiTextAreaModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChangeSchedule } from '@tss/api';
import { TssTeachingScheduleChangeStore } from '../../../../change.store';

const TAIGA_UI = [TuiTextAreaModule, TuiButtonModule];

@Component({
  selector: 'tss-teaching-schedule-change-request-list-status-deny-dialog',
  templateUrl: './deny-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ...TAIGA_UI],
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'primary',
      size: 'm',
    }),
    {
      provide: TUI_TEXTFIELD_APPEARANCE,
      useValue: TuiAppearance.Textfield,
    },
  ],
})
export class TssTeachingScheduleChangeRequestListStatusDenyDialogComponent {
  // INJECTIONS
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(TssTeachingScheduleChangeStore);
  private readonly context =
    inject<TuiDialogContext<void, ChangeSchedule>>(POLYMORPHEUS_CONTEXT);

  // PUBLIC PROPERTIES
  form!: FormGroup;

  // CONSTRUCTOR
  constructor() {
    this.initForm();
  }

  // PUBLIC METHODS
  confirm(): void {
    const reason = this.form.controls['reason'].value as string;
    this.store.deny({ schedule: this.context.data, reason });
    this.cancel();
  }

  cancel(): void {
    setTimeout(() => {
      this.context.$implicit.complete();
    });
  }

  // PRIVATE METHODS
  private initForm(): void {
    this.form = this.fb.group({
      reason: ['', Validators.required],
    });
  }
}
