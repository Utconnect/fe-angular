import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiLoaderModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiCheckboxModule } from '@taiga-ui/kit';
import { ModuleClass } from '@tss/api';
import { ScheduleConstant } from '@tss/constants';
import { Status } from '@utconnect/types';
import { Observable } from 'rxjs';
import { TssTeachingScheduleAssignStore } from '../store';

const TAIGA_UI = [
  TuiCheckboxModule,
  TuiLetModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTableModule,
];

@Component({
  selector: 'tss-teaching-schedule-assign-table',
  templateUrl: './assign-table.component.html',
  styleUrls: ['./assign-table.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LetModule,
    ...TAIGA_UI,
  ],
})
export class TssTeachingScheduleAssignTableComponent implements OnChanges {
  // INPUT
  @Input() data!: ModuleClass[];
  @Input() excludeTeacher = false;

  // PUBLIC PROPERTIES
  readonly columns = [
    'checkbox',
    'index',
    'name',
    'credit',
    'type',
    'numberReality',
    'teacher',
  ];
  readonly classType = ScheduleConstant.CLASS_TYPE;
  readonly filterStatus$: Observable<Status>;
  form!: FormGroup;

  // PRIVATE PROPERTIES
  private _selectAll = false;

  // GETTERS
  get checkboxes(): FormArray {
    return this.form.controls['checkbox'] as FormArray;
  }

  get selectAll(): boolean {
    return this._selectAll;
  }

  // SETTERS
  set selectAll(checked: boolean) {
    this.checkboxes.controls.forEach((checkbox) => {
      checkbox.setValue(checked);
    });

    this.store.changeSelected(
      this.data.map(({ id }) => id),
      checked,
    );
  }

  // CONSTRUCTOR
  constructor(
    private readonly fb: FormBuilder,
    private readonly store: TssTeachingScheduleAssignStore,
  ) {
    this.filterStatus$ = store.status$('filter');
  }

  // LIFECYCLE
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.resetForm();
    }
  }

  // PUBLIC METHODS
  onModelChange(id: string, checked: boolean): void {
    if (
      this._selectAll &&
      this.checkboxes.controls.some(({ value }) => !value)
    ) {
      this._selectAll = false;
    } else if (
      !this._selectAll &&
      this.checkboxes.controls.every(({ value }) => value)
    ) {
      this._selectAll = true;
    }

    this.store.changeSelected([id], checked);
  }

  getCheckbox(i: number): FormControl {
    return this.checkboxes.at(i) as FormControl;
  }

  // PRIVATE METHODS
  private resetForm(): void {
    this.form = this.fb.group({
      checkbox: this.fb.array(this.data.map(() => false)),
    });
    this._selectAll = false;
  }
}
