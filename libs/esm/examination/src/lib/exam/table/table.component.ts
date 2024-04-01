import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDto,
  ESMDomainEnumsExaminationStatus,
} from '@esm/api';
import { EsmExamMethodPipe } from '@esm/pipes';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiButtonModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { filter, tap, withLatestFrom } from 'rxjs';
import { ExaminationExamStore } from '../exam.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiInputNumberModule,
  TuiScrollbarModule,
  TuiTableModule,
];

@Component({
  selector: 'esm-examination-exam-table',
  standalone: true,
  imports: [
    CommonModule,
    EsmExamMethodPipe,
    ReactiveFormsModule,
    ScrollingModule,
    NGRX,
    TAIGA_UI,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationExamTableComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(ExaminationExamStore);

  // PUBLIC PROPERTIES
  form?: FormGroup<{
    data: FormArray<FormControl<number>>;
  }>;

  readonly ExaminationStatus = ESMDomainEnumsExaminationStatus;
  readonly columns = [
    'index',
    'moduleId',
    'moduleName',
    'credit',
    'method',
    'date',
    'startAt',
    'shift',
    'room',
    'invigilatorsCount',
    'candidatesCount',
    'examsCount',
  ];

  readonly data$ = this.store.displayData$;
  readonly tableObs$ = this.store.tableObs$;

  // PRIVATE PROPERTIES
  private readonly tableFormIsPristine$ = this.store.tableFormIsPristine$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleDataChanges();
  }

  // PUBLIC METHODS
  examsCountControl(index: number): FormControl {
    return this.form?.controls.data.controls.at(index) as FormControl;
  }

  save(): void {
    if (this.form) {
      this.store.save(this.form.controls.data.value);
    }
  }

  // PRIVATE METHODS
  private handleDataChanges(): void {
    this.data$.pipe(tap((data) => this.buildForm(data))).subscribe();
  }

  private buildForm(
    data: ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDto[],
  ): void {
    this.form = this.fb.group({
      data: this.fb.array(
        data.map((row) =>
          this.fb.control(row.examsCount, {
            validators: [Validators.required, Validators.min(0)],
          }),
        ),
      ),
    });

    this.form.valueChanges
      .pipe(
        withLatestFrom(this.tableFormIsPristine$),
        filter(({ 1: tableFormIsPristine }) => tableFormIsPristine),
        tap(() => this.store.patchState({ tableFormIsPristine: false })),
      )
      .subscribe();
  }
}
