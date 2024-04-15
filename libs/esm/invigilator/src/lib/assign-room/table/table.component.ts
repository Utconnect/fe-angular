import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  AssignInvigilatorsToShiftsPayload,
  ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemResponseItem,
} from '@esm/api';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiLineClampModule, TuiSelectModule } from '@taiga-ui/kit';
import { filter, tap } from 'rxjs';
import { InvigilatorAssignRoomStore, ShiftUiModel } from '../assign-room.store';
import { InvigilatorAssignRoomTableTeacherCellComponent } from './teacher-cell/teacher-cell.component';

export const TAIGA_UI = [
  TuiDataListModule,
  TuiLineClampModule,
  TuiScrollbarModule,
  TuiSelectModule,
  TuiSvgModule,
  TuiTableModule,
  TuiTextfieldControllerModule,
];

type FormType = {
  [key: string]: FormControl<string | null>;
};

@Component({
  selector: 'esm-invigilator-assign-room-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule,
    LetModule,
    InvigilatorAssignRoomTableTeacherCellComponent,
    ...TAIGA_UI,
  ],
})
export class InvigilatorAssignRoomTableComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(InvigilatorAssignRoomStore);

  // PUBLIC PROPERTIES
  form?: FormGroup<FormType>;
  columns = [
    'index',
    'moduleId',
    'moduleName',
    'startAt',
    'shift',
    'room',
    'candidatesCount',
    'orderIndex',
    'teacher',
    'teacherFaculty',
    'teacherDepartment',
    'phoneNumber',
  ];

  readonly data$ = this.store.data$;
  readonly tableObservables$ = this.store.tableObservables$;
  readonly usedInvigilatorsMap$ = this.store.usedInvigilatorsMap$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
    this.handleUpdateUsedInvigilatorMap();
  }

  // PUBLIC METHODS
  @tuiPure
  invigilatorStringify(
    items: ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemResponseItem[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(
      items
        .filter(
          (
            item,
          ): item is {
            id: string;
            fullName: string;
            isPriority: boolean;
          } => 'id' in item,
        )
        .map(({ id, fullName }) => [id, fullName] as [string, string]),
    );

    return ({ $implicit }: TuiContextWithImplicit<string>) =>
      map.get($implicit) ?? '';
  }

  saveChange(): void {
    if (!this.form) {
      return;
    }

    const dataToSave: AssignInvigilatorsToShiftsPayload = {};

    Object.entries(this.form.controls).forEach(([controlName, control]) => {
      if (control.pristine) return;
      const invigilatorId = control.getRawValue() ?? '';
      dataToSave[controlName] = invigilatorId;
    });

    this.store.save(dataToSave);
  }

  // PRIVATE METHODS
  private handleBuildForm(): void {
    this.data$
      .pipe(
        filter((data) => !!data.length),
        tap((data) => {
          this.buildForm(data);
          this.cdr.markForCheck();
        }),
      )
      .subscribe();
  }

  private buildForm(data: ShiftUiModel[]): void {
    this.form = this.fb.group(
      data.reduce(
        (acc, curr) => {
          acc[curr.id] = [curr.invigilator?.id ?? null];
          return acc;
        },
        {} as Record<string, (string | null)[]>,
      ),
    );
  }

  private handleUpdateUsedInvigilatorMap(): void {
    this.data$
      .pipe(
        tap((data) => {
          const res: Record<string, Record<string, string>> = {};

          data.forEach((shift) => {
            if (shift.invigilator?.id) {
              res[shift.shiftGroup.id] ??= {};
              res[shift.shiftGroup.id][shift.invigilator.id] = shift.id;
            }
          });

          this.usedInvigilatorsMap$.next(res);
        }),
      )
      .subscribe();
  }
}
