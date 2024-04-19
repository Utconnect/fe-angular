import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Injector,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  DefaultValueAccessor,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemTemporaryInvigilator,
  ESMDomainEnumsExaminationStatus,
  GetAvailableInvigilatorsInShiftGroupData,
  UserSummary,
} from '@esm/api';
import {
  EsmDialogEditInvigilatorComponent,
  EsmDialogSelectTeacherComponent,
} from '@esm/dialog';
import { LetModule } from '@ngrx/component';
import { TuiContextWithImplicit, TuiStringHandler } from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiDialogService,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ObservableHelper } from '@utconnect/helpers';
import { ObjectPipe } from '@utconnect/pipes';
import { loggerProvider, LoggerService } from '@utconnect/services';
import { filter, map, tap } from 'rxjs';
import {
  InvigilatorAssignRoomStore,
  ShiftUiModel,
} from '../../assign-room.store';

export const TAIGA_UI = [
  TuiDataListModule,
  TuiSelectModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
];

const selector = 'esm-invigilator-assign-room-table-teacher-cell';

@Component({
  selector,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LetModule,
    ObjectPipe,
    ...TAIGA_UI,
  ],
  templateUrl: './teacher-cell.component.html',
  styleUrls: ['./teacher-cell.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    loggerProvider({ tag: selector }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultValueAccessor),
      multi: true,
    },
  ],
})
export class InvigilatorAssignRoomTableTeacherCellComponent
  implements ControlValueAccessor
{
  // INJECT PROPERTIES
  ngControl = inject(NgControl);
  private readonly store = inject(InvigilatorAssignRoomStore);
  private readonly injector = inject(Injector);
  private readonly loggerService = inject(LoggerService);
  private readonly dialogService = inject(TuiDialogService);

  // INPUT
  @Input()
  row!: ShiftUiModel;

  @Input()
  invigilatorContent!: TuiStringHandler<TuiContextWithImplicit<string>>;

  @Input()
  invigilatorsData!: GetAvailableInvigilatorsInShiftGroupData['data'][string];

  // VIEW CHILD
  @ViewChild(DefaultValueAccessor)
  valueAccessor?: DefaultValueAccessor;

  // PUBLIC PROPERTIES
  readonly temporaryInvigilatorModel!: ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemTemporaryInvigilator;
  readonly usedInvigilatorsMap$ = this.store.usedInvigilatorsMap$;
  readonly examinationIsClosed$ = this.store.examination$.pipe(
    ObservableHelper.filterNullish(),
    map((e) => e.status === ESMDomainEnumsExaminationStatus.Closed),
  );

  // GETTERS
  get control(): FormControl {
    const control = this.loggerService.errorNullOrEmpty({
      value: this.ngControl.control,
      name: 'control',
    });
    return control as FormControl;
  }

  // IMPLEMENTATIONS
  writeValue(obj: unknown): void {
    this.valueAccessor?.writeValue(obj);
  }

  registerOnChange(fn: (_: unknown) => object): void {
    this.valueAccessor?.registerOnChange(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.valueAccessor?.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.valueAccessor?.setDisabledState(isDisabled);
  }

  // PUBLIC METHODS
  onInvigilatorChanges(
    currentShiftGroupId: string,
    currentShiftId: string,
    newInvigilatorId: string,
  ): void {
    const newValue = this.usedInvigilatorsMap$.value;
    newValue[currentShiftGroupId] ??= {};
    const shiftGroupDataEntries = Object.entries(newValue[currentShiftGroupId]);

    // Remove old invigilator
    for (const [invigilatorId, shiftId] of shiftGroupDataEntries) {
      if (shiftId === currentShiftId) {
        delete newValue[currentShiftGroupId][invigilatorId];
      }
    }

    // Assign new one
    if (newInvigilatorId) {
      newValue[currentShiftGroupId][newInvigilatorId] = currentShiftId;
    }

    this.usedInvigilatorsMap$.next(newValue);
  }

  onAddNewInvigilator(
    invigilatorName: string,
    departmentId: string,
    shiftGroupId: string,
  ): void {
    this.dialogService
      .open<UserSummary>(
        new PolymorpheusComponent(
          EsmDialogEditInvigilatorComponent,
          this.injector,
        ),
        { data: { invigilatorName, departmentId } },
      )
      .pipe(
        filter((x) => !!x),
        tap(({ id }) =>
          this.store.updateTeacherAssignment({
            shiftGroupId,
            departmentId,
            userId: id,
          }),
        ),
      )
      .subscribe();
  }

  onAddOtherInvigilator(shiftGroupId: string): void {
    this.dialogService
      .open<UserSummary>(
        new PolymorpheusComponent(
          EsmDialogSelectTeacherComponent,
          this.injector,
        ),
      )
      .pipe(
        filter((x) => !!x),
        tap(({ id }) => this.store.save({ [shiftGroupId]: id })),
      )
      .subscribe();
  }
}
