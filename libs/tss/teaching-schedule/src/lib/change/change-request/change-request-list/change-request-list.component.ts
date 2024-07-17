import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiDestroyService, TuiLetModule } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiCheckboxModule } from '@taiga-ui/kit';
import { ChangeSchedule } from '@tss/api';
import { PermissionConstant } from '@tss/constants';
import { ChangeStatusHelper } from '@tss/helpers';
import { ArrayPipe } from '@utconnect/pipes';
import { Nullable } from '@utconnect/types';
import { distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs';
import { TssTeachingScheduleChangeStore } from '../../change.store';
import { TssTeachingChangeRequestListActionComponent } from './change-request-list-action';
import { TssTeachingScheduleChangeRequestListStatusComponent } from './change-request-list-status';

const TAIGA_UI = [
  TuiCheckboxModule,
  TuiLetModule,
  TuiLoaderModule,
  TuiTableModule,
];

@Component({
  selector: 'tss-teaching-schedule-change-request-list',
  templateUrl: './change-request-list.component.html',
  styleUrls: ['./change-request-list.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LetModule,
    ArrayPipe,
    TssTeachingChangeRequestListActionComponent,
    TssTeachingScheduleChangeRequestListStatusComponent,
    ...TAIGA_UI,
  ],
})
export class TssTeachingScheduleChangeRequestListComponent {
  // INJECTIONS
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly store = inject(TssTeachingScheduleChangeStore);

  // VIEW CHILD
  @ViewChild('teacherCol', { static: false, read: ElementRef })
  teacherColumn!: ElementRef;

  // PUBLIC PROPERTIES
  form: FormGroup = new FormGroup({});
  teacherColumnWidth = 0;
  checkAll: Nullable<boolean> = false;
  checkableIndexes: number[] = [];
  columns: string[] = [];
  initialColumns = [
    'checkbox',
    'index',
    'teacher',
    'moduleClass',
    'oldDate',
    'newDate',
    'oldShift',
    'newShift',
    'reason',
    'createdAt',
    'status',
    'actions',
  ];

  readonly page$ = this.store.page$;
  readonly options$ = this.store.options$;
  readonly status$ = this.store.status$('data');
  readonly permissions$ = this.store.permissions$;
  readonly changeSchedules$ = this.store.changeSchedules$;

  readonly isPersonal = this.route.snapshot.data['personal'] as boolean;

  // TODO: Split into constant
  readonly itemsPerPage = 20;
  readonly PermissionConstant = PermissionConstant;

  // GETTER
  private get checkboxControl(): FormArray {
    return this.form.controls['checkbox'] as FormArray;
  }

  // CONSTRUCTOR
  constructor() {
    this.configureColumns();
    this.handleOptionsChange();
    this.triggerDataChange();
  }

  // PUBLIC METHODS
  onCheckAllChange(): void {
    const checkboxesValue = Array(this.checkboxControl.length).fill(false);
    if (this.checkAll) {
      this.checkableIndexes.forEach((idx) => {
        checkboxesValue[idx] = true;
      });
    }

    this.checkboxControl.patchValue(checkboxesValue, {
      onlySelf: true,
    });
  }

  onCheckChange(checked: boolean): void {
    for (let i = 0; i < this.checkableIndexes.length; i++) {
      const index = this.checkableIndexes[i];
      if (this.checkboxControl.at(index).value !== checked) {
        this.checkAll = null;
        return;
      }
    }

    this.checkAll = checked;
  }

  // PRIVATE METHODS
  private configureColumns(): void {
    if (this.isPersonal) {
      this.initialColumns = this.initialColumns.filter((x) => x !== 'teacher');
    } else {
      this.initialColumns = this.initialColumns.filter((x) => x !== 'checkbox');
    }
  }

  private handleOptionsChange(): void {
    this.options$
      .pipe(
        map(({ showReason }) => showReason),
        distinctUntilChanged(),
        tap((showReason) => {
          if (showReason) {
            this.columns = this.initialColumns;
          } else {
            this.columns = this.initialColumns.filter((x) => x !== 'reason');
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private triggerDataChange(): void {
    this.changeSchedules$
      .pipe(
        filter(({ length }) => length > 0),
        distinctUntilChanged(),
        tap((changeSchedules) => {
          this.initForm(changeSchedules);
          this.resetCheckbox(changeSchedules);
          this.handleCheckboxChanges();
          this.calculateStickyColumn();
        }),
      )
      .subscribe();
  }

  private initForm(changeSchedules: ChangeSchedule[]): void {
    this.form = this.fb.group({
      checkbox: this.fb.array(changeSchedules.map(() => false)),
    });
  }

  private resetCheckbox(changeSchedules: ChangeSchedule[]): void {
    this.checkAll = false;
    this.checkableIndexes = changeSchedules.reduce<number[]>(
      (acc, curr, index) => {
        if (ChangeStatusHelper.canExport(curr.status)) {
          acc.push(index);
        }
        return acc;
      },
      [],
    );
  }

  private handleCheckboxChanges(): void {
    this.checkboxControl.valueChanges
      .pipe(
        tap((exportIndexes: boolean[]) => {
          this.store.patchState({ exportIndexes });
        }),
      )
      .subscribe();
  }

  private calculateStickyColumn(): void {
    if (!this.isPersonal) {
      setTimeout(() => {
        this.teacherColumnWidth = (
          this.teacherColumn.nativeElement as HTMLElement
        ).offsetWidth;
        this.cdr.markForCheck();
      });
    }
  }
}
