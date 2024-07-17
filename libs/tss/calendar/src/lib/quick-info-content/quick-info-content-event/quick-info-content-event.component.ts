import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { TuiDestroyService, TuiFilterPipeModule } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiDialogService,
  TuiLinkModule,
  TuiNotification,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiTextAreaComponent, TuiTextAreaModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TssChangeScheduleHistoryDialogComponent } from '@tss/dialog';
import { ArrayPipe, DateRangePipe, ObjectPipe } from '@utconnect/pipes';
import {
  EjsScheduleModel,
  GoogleAttendees,
  SimpleModel,
} from '@utconnect/types';
import { Observable, of, switchMap, takeUntil } from 'rxjs';
import { TssCalendarQuickInfoContentEventStore } from '../store/quick-info-content.store';

const TAIGA_UI = [
  TuiButtonModule,
  TuiFilterPipeModule,
  TuiLinkModule,
  TuiTextAreaModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'tss-calendar-quick-info-content-event',
  templateUrl: './quick-info-content-event.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    DateRangePipe,
    ArrayPipe,
    ObjectPipe,
    ...TAIGA_UI,
  ],
  providers: [TssCalendarQuickInfoContentEventStore],
})
export class TssCalendarQuickInfoContentEventComponent implements OnInit {
  // INJECTIONS
  readonly schedule: ScheduleComponent = inject(
    forwardRef(() => ScheduleComponent),
    {},
  );
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(TuiDialogService);
  private readonly alertService = inject(TuiAlertService);
  private readonly store = inject(TssCalendarQuickInfoContentEventStore);
  private readonly destroy$ = inject(TuiDestroyService);

  // INPUT
  @Input() data!: EjsScheduleModel;

  // VIEWCHILD
  @ViewChild('note') note!: TuiTextAreaComponent;

  // PUBLIC PROPERTIES
  readonly status$ = this.store.status$;
  initialEventNote = '';

  // PRIVATE PROPERTIES
  private historyDialog$!: Observable<void>;
  private noteControlHeight = 20;

  // CONSTRUCTOR
  constructor() {
    this.handleStatusChange();
  }

  // LIFECYCLE
  ngOnInit(): void {
    this.initialEventNote = this.data.Note;

    // This function use ```data```, which is an @Input, so must be called in ngOnInit
    this.initDialog();
  }

  // PUBLIC METHODS
  readonly peopleMatcher = (
    item: string | SimpleModel | GoogleAttendees,
  ): boolean => item !== 'self';

  onShowHistory(): void {
    this.historyDialog$.subscribe();
  }

  onNoteChange(): void {
    const currentHeight = this.note.nativeFocusableElement?.clientHeight;
    if (currentHeight && this.noteControlHeight < currentHeight) {
      setTimeout(() => this.schedule.quickPopup.quickPopup.refreshPosition());
      this.noteControlHeight = currentHeight;
    }
  }

  onClickSave(): void {
    if (this.data.Type === 'googleEvent') {
      return;
    }

    if (this.data.Note !== this.initialEventNote) {
      this.store.updateNote({
        id: this.data.Id,
        type: this.data.Type,
        payload: { note: this.data.Note },
      });
      this.schedule.saveEvent(this.data);
    }
  }

  // PRIVATE METHODS
  private initDialog(): void {
    if ('FixedSchedules' in this.data) {
      this.historyDialog$ = this.dialogService.open(
        new PolymorpheusComponent(
          TssChangeScheduleHistoryDialogComponent,
          this.injector,
        ),
        {
          data: this.data.FixedSchedules,
          label: 'Lịch sử thay đổi giờ giảng',
        },
      );
    }
  }

  private handleStatusChange(): void {
    this.status$
      .pipe(
        switchMap((status) => {
          switch (status) {
            case 'success':
              return this.alertService.open('Cập nhật lịch thành công!', {
                status: TuiNotification.Success,
              });
            case 'error':
              return this.alertService.open('Vui lòng thử lại sau', {
                label: 'Đã có lỗi xảy ra',
                status: TuiNotification.Error,
              });
          }
          return of({});
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
