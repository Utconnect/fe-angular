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
import { ControlContainer, FormGroup } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { TuiDay, TuiDestroyService } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';
import {
  RequestChangeSchedulePayload,
  RequestIntendChangeSchedulePayload,
} from '@tss/api';
import { DateHelper } from '@utconnect/helpers';
import { DialogService } from '@utconnect/services';
import { FixedScheduleModel, Nullable } from '@utconnect/types';
import {
  filter,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { TssTeachingDialogStore } from '../../store';

const TAIGA_UI = [TuiButtonModule];

@Component({
  selector: 'tss-teaching-dialog-buttons-left',
  templateUrl: './teaching-dialog-buttons-left.component.html',
  styleUrls: ['./teaching-dialog-buttons-left.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
  providers: [TuiDestroyService],
})
export class TssTeachingDialogButtonsLeftComponent implements OnInit {
  // INJECTIONS
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly dialogService = inject(DialogService);
  private readonly store = inject(TssTeachingDialogStore);
  private readonly controlContainer = inject(ControlContainer);

  // INPUT
  @Input() idSchedule!: number;
  @Input() changed!: boolean;
  @Input() validRequestChangeSchedule!: boolean;
  @Input() requestedChangeSchedule!: Nullable<FixedScheduleModel>;
  @Input() isPersonal!: boolean;
  @Input() requestChangeToUndeterminedDay!: boolean;

  // OUTPUT
  @Output() changedChange = new EventEmitter<boolean>();

  // PUBLIC PROPERTIES
  form!: FormGroup;
  readonly changeStatus$ = this.store.status$('change');
  readonly cancelStatus$ = this.store.status$('cancel');
  readonly searchStatus$ = this.store.status$('search');
  readonly searchSchedule$ = this.store.searchSchedule$;
  readonly requestStatus$ = this.store.status$('request');
  readonly justRequestedSchedule$ = this.store.justRequestedSchedule$;
  readonly requestingChangeSchedule$ = this.store.requestingChangeSchedule$;

  readonly submitRequestChange$ = new Subject<void>();
  readonly submitChange$ = new Subject<void>();

  // GETTERS
  get requestControl(): FormGroup {
    return this.form.controls['request'] as FormGroup;
  }

  get requestIntendControl(): FormGroup {
    return this.form.controls['requestIntend'] as FormGroup;
  }

  private get roomControlValue(): string {
    return this.requestControl.controls['room'].value as string;
  }

  private get shiftControlValue(): string {
    return this.requestControl.controls['shift'].value as string;
  }

  private get dateControlValue(): TuiDay {
    return this.requestControl.controls['date'].value as TuiDay;
  }

  // CONSTRUCTOR
  constructor() {
    this.handleSubmitRequestChange();
    this.handleSubmitChange();
  }

  // LIFECYCLE
  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.handleFormChange();
  }

  // PUBLIC METHODS
  unfold(): void {
    this.store.toggleRequest(true);
  }

  // PRIVATE METHODS
  private handleSubmitRequestChange(): void {
    this.submitRequestChange$
      .pipe(
        withLatestFrom(this.searchSchedule$),
        map(({ 1: searchSchedule }) => searchSchedule),
        switchMap((searchSchedule) => {
          if (this.requestChangeToUndeterminedDay) {
            this.submitChangeIntendTimeRequest();
            return of({});
          }

          if (searchSchedule?.length) {
            return this.dialogService
              .showConfirmDialog({
                header:
                  'Ca học này đã bị trùng lớp học phần khác. Vẫn tiếp tục?',
              })
              .pipe(
                filter((confirm) => confirm),
                tap(() => this.submitChangeRequest()),
              );
          }

          this.submitChangeRequest();
          return of({});
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private handleSubmitChange(): void {
    this.submitChange$
      .pipe(
        withLatestFrom(this.searchSchedule$),
        map(({ 1: searchSchedule }) => searchSchedule),
        switchMap((searchSchedule) => {
          if (searchSchedule?.length) {
            return this.dialogService
              .showConfirmDialog({
                header:
                  'Ca học này đã bị trùng lớp học phần khác. Vẫn tiếp tục?',
              })
              .pipe(
                filter((confirm) => confirm),
                tap(() => this.submitChange()),
              );
          }

          this.submitChange();
          return of({});
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private handleFormChange(): void {
    this.requestControl.valueChanges
      .pipe(
        tap(() => {
          if (!this.requestChangeToUndeterminedDay) {
            this.cdr.markForCheck();
          }
        }),
      )
      .subscribe();
    this.requestIntendControl.valueChanges
      .pipe(
        tap(() => {
          if (this.requestChangeToUndeterminedDay) {
            this.cdr.markForCheck();
          }
        }),
      )
      .subscribe();
  }

  private submitChangeIntendTimeRequest(): void {
    const request = this.requestIntendControl;
    const payload: RequestIntendChangeSchedulePayload = {
      idSchedule: this.idSchedule,
      intendTime: request.controls['intendTime'].value as string,
      reason: request.controls['reason'].value as string,
    };

    this.store.requestIntend(payload);
  }

  private submitChangeRequest(): void {
    const request = this.requestControl;
    const payload: RequestChangeSchedulePayload = {
      idSchedule: this.idSchedule,
      newIdRoom: (request.controls['online'].value as boolean) ? 'PHTT' : null,
      newShift: this.shiftControlValue,
      newDate: DateHelper.toDateOnlyString(
        this.dateControlValue.toUtcNativeDate(),
      ),
      reason: request.controls['reason'].value as string,
    };

    this.store.request(payload);
  }

  private submitChange(): void {
    const payload: RequestChangeSchedulePayload = {
      idSchedule: this.idSchedule,
      newIdRoom: this.roomControlValue,
      newShift: this.shiftControlValue,
      newDate: DateHelper.toDateOnlyString(
        this.dateControlValue.toUtcNativeDate(),
      ),
      reason: 'Trưởng bộ môn thay đổi',
    };

    this.store.change(payload);
  }
}
