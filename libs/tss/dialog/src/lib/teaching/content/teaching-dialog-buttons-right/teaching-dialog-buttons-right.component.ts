import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { TuiButtonModule } from '@taiga-ui/core';
import { TssTeachingDialogStore } from '../../store';

const TAIGA_UI = [TuiButtonModule];

@Component({
  selector: 'tss-teaching-dialog-buttons-right',
  templateUrl: './teaching-dialog-buttons-right.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
})
export class TssTeachingDialogButtonsRightComponent implements OnInit {
  // INJECTIONS
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly controlContainer = inject(ControlContainer);
  private readonly store = inject(TssTeachingDialogStore);

  // INPUT
  @Input() idSchedule!: number;

  // OUTPUT
  @Output() cancel = new EventEmitter();

  // PUBLIC PROPERTIES
  form!: FormGroup;

  readonly changeStatus$ = this.store.status$('change');
  readonly updateStatus$ = this.store.status$('update');
  readonly requestStatus$ = this.store.status$('request');
  readonly requestingChangeSchedule$ = this.store.requestingChangeSchedule$;

  // GETTERS
  private get noteControl(): FormControl {
    return (this.form.controls['change'] as FormGroup).controls[
      'note'
    ] as FormControl;
  }

  // LIFECYCLE
  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
  }

  // PUBLIC METHODS
  fold(): void {
    this.store.toggleRequest(false);
  }

  onUpdate(): void {
    const payload = {
      note: this.noteControl.value as string,
    };
    this.store.update({ id: this.idSchedule, payload });
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
}
