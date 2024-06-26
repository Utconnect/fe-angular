import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  tuiButtonOptionsProvider,
  TuiDialogService,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ChangeSchedule } from '@tss/api';
import { ScheduleConstant } from '@tss/constants';
import { PermissionHelper } from '@tss/helpers';
import { TssStatusColorPipe } from '@tss/pipes';
import { ArrayPipe } from '@utconnect/pipes';
import {
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs';
import { TssTeachingScheduleChangeStore } from '../../../change.store';
import { TssTeachingScheduleChangeRequestListStatusDenyDialogComponent } from './deny-dialog';
import { TssTeachingScheduleChangeRequestListStatusSetRoomDialogComponent } from './set-room-dialog';

const TAIGA_UI = [TuiLoaderModule];

@Component({
  selector: 'tss-teaching-schedule-change-request-list-status',
  templateUrl: './change-request-list-status.component.html',
  styleUrls: ['./change-request-list-status.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ArrayPipe, TssStatusColorPipe, ...TAIGA_UI],
  providers: [
    TuiDestroyService,
    tuiButtonOptionsProvider({
      shape: 'square',
      appearance: 'primary',
      size: 'xs',
    }),
  ],
})
export class TssTeachingScheduleChangeRequestListStatusComponent
  implements OnInit
{
  // INJECTIONS
  private readonly injector = inject(Injector);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly dialogService = inject(TuiDialogService);
  private readonly store = inject(TssTeachingScheduleChangeStore);

  // INPUT
  @Input() displayText!: boolean;
  @Input() item!: ChangeSchedule;

  // PUBLIC PROPERTIES
  readonly requesting$ = this.store.status$('queue');
  readonly permissions$ = this.store.permissions$;
  readonly accept$ = new Subject<void>();
  readonly statusList = ScheduleConstant.REQUEST_CHANGE_SCHEDULE_STATUS;

  // PRIVATE PROPERTIES
  private acceptDialog$!: Observable<void>;
  private denyDialog$!: Observable<void>;

  // CONSTRUCTOR
  constructor() {
    this.handleAccept();
  }

  // LIFECYCLE
  ngOnInit(): void {
    // This function use ```item```, which is an @Input, so must be called in ngOnInit
    this.initDialog();
  }

  // PUBLIC METHODS
  onDeny(): void {
    this.denyDialog$.subscribe();
  }

  // PRIVATE METHODS
  private initDialog(): void {
    this.acceptDialog$ = this.dialogService.open(
      new PolymorpheusComponent(
        TssTeachingScheduleChangeRequestListStatusSetRoomDialogComponent,
        this.injector,
      ),
      {
        label: 'Xếp phòng cho giảng viên',
        data: this.item,
      },
    );
    this.denyDialog$ = this.dialogService.open(
      new PolymorpheusComponent(
        TssTeachingScheduleChangeRequestListStatusDenyDialogComponent,
        this.injector,
      ),
      {
        label: 'Từ chối yêu cầu thay đổi lịch giảng',
        data: this.item,
      },
    );
  }

  private handleAccept(): void {
    this.accept$
      .pipe(
        withLatestFrom(this.permissions$),
        switchMap(({ 1: permissions }) => {
          if (PermissionHelper.isDepartmentHead(permissions)) {
            this.store.accept(this.item);
            return of({});
          }

          return this.acceptDialog$;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
