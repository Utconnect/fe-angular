import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LetModule } from '@ngrx/component';
import {
  TuiAppearance,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogContext,
  TUI_TEXTFIELD_APPEARANCE,
} from '@taiga-ui/core';
import { TuiComboBoxModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChangeSchedule } from '@tss/api';
import { FilterByInputPipe } from '@utconnect/pipes';
import { TssTeachingScheduleChangeStore } from '../../../../change.store';

const TAIGA_UI = [TuiComboBoxModule, TuiDataListWrapperModule, TuiButtonModule];

@Component({
  selector: 'tss-teaching-schedule-change-request-list-status-set-room-dialog',
  templateUrl: './set-room-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LetModule,
    FilterByInputPipe,
    ...TAIGA_UI,
  ],
})
export class TssTeachingScheduleChangeRequestListStatusSetRoomDialogComponent {
  // INJECTIONS
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(TssTeachingScheduleChangeStore);
  private readonly context =
    inject<TuiDialogContext<void, ChangeSchedule>>(POLYMORPHEUS_CONTEXT);

  // PUBLIC PROPERTIES
  readonly rooms$ = this.store.rooms$;
  form!: FormGroup;

  // CONSTRUCTOR
  constructor() {
    this.initForm();
  }

  // PUBLIC METHODS
  confirm(): void {
    const newIdRoom = this.form.controls['newRoom'].value as string;
    this.store.setRoom({ schedule: this.context.data, newIdRoom });
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
      newRoom: ['', Validators.required],
    });
  }
}
