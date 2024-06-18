import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiTextAreaModule } from '@taiga-ui/kit';
import { FormConstant } from '@tss/constants';
import { fadeIn } from '@utconnect/animations';

const TAIGA_UI = [TuiSvgModule, TuiTextAreaModule];

@Component({
  selector: 'tss-teaching-dialog-request-change-intend',
  templateUrl: './teaching-dialog-request-change-intend.component.html',
  styleUrls: ['./teaching-dialog-request-change-intend.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ...TAIGA_UI],
  animations: [fadeIn],
})
export class TssTeachingDialogRequestChangeIntendComponent implements OnInit {
  // INJECTIONS
  public readonly controlContainer = inject(ControlContainer);

  // PUBLIC PROPERTIES
  form!: FormGroup;
  readonly FormConstant = FormConstant;

  // GETTERS
  get requestIntendControl(): FormGroup {
    return this.form.controls['requestIntend'] as FormGroup;
  }

  // LIFECYCLE
  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
  }
}
