import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { LetModule } from '@ngrx/component';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogService,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {
  ChangeSchedule,
  ExportService,
  Teacher,
  TeacherService,
} from '@tss/api';
import { TssChangeDetailsDialogComponent } from '@tss/dialog';
import { PermissionHelper } from '@tss/helpers';
import { FileType } from '@tss/types';
import { IconConstant } from '@utconnect/constants';
import { ObservableHelper, StringHelper } from '@utconnect/helpers';
import { ArrayPipe } from '@utconnect/pipes';
import { DialogService } from '@utconnect/services';
import { Nullable } from '@utconnect/types';
import {
  filter,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { TssTeachingScheduleChangeStore } from '../../../change.store';
import { TssTeachingScheduleChangeRequestListActionCanExportPipe } from './can-export-pipe';
import { TssTeachingScheduleChangeRequestListActionStatusTypePipe } from './status-type-pipe';

const TAIGA_UI = [TuiButtonModule, TuiLoaderModule];

@Component({
  selector: 'tss-teaching-schedule-change-request-list-action',
  templateUrl: './change-request-list-action.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    LetModule,
    ArrayPipe,
    TssTeachingScheduleChangeRequestListActionCanExportPipe,
    TssTeachingScheduleChangeRequestListActionStatusTypePipe,
    ...TAIGA_UI,
  ],
  providers: [
    TuiDestroyService,
    tuiButtonOptionsProvider({
      appearance: 'icon',
      size: 'l',
    }),
  ],
})
export class TssTeachingChangeRequestListActionComponent implements OnInit {
  // INJECTIONS

  private readonly injector = inject(Injector);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly dialogService = inject(DialogService);
  private readonly exportService = inject(ExportService);
  private readonly teacherService = inject(TeacherService);
  private readonly tuiDialogService = inject(TuiDialogService);
  private readonly store = inject(TssTeachingScheduleChangeStore);

  // INPUT
  @Input() schedule!: ChangeSchedule;
  @Input() canCancel!: boolean;

  // PUBLIC PROPERTIES
  showLoader = false;
  readonly export$ = new Subject<void>();
  readonly cancel$ = new Subject<void>();
  readonly IconConstant = IconConstant;

  readonly requesting$ = this.store.status$('queue');

  // PRIVATE PROPERTIES
  private readonly datePipe = inject(DatePipe);
  private readonly teacher$ = this.store.teacher$;
  private readonly nameTitle$ = this.store.nameTitle$;
  private readonly permissions$ = this.store.permissions$;
  private dialog$!: Observable<void>;

  // CONSTRUCTOR
  constructor() {
    this.handleExport();
    this.handleCancel();
  }

  // LIFECYCLE
  ngOnInit(): void {
    // This function use ```schedule```, which is an @Input, so must be called in ngOnInit
    this.initDialog();
  }

  // PUBLIC METHODS
  showDetails(): void {
    this.dialog$.subscribe();
  }

  // PRIVATE METHODS
  private initDialog(): void {
    this.dialog$ = this.tuiDialogService.open(
      new PolymorpheusComponent(TssChangeDetailsDialogComponent, this.injector),
      {
        data: this.schedule,
        label: 'Chi tiết yêu cầu thay đổi giờ giảng',
      },
    );
  }

  private handleExport(): void {
    this.export$
      .pipe(
        withLatestFrom(this.permissions$, this.teacher$),
        map(({ 1: permissions, 2: teacher }) => ({ permissions, teacher })),
        tap(({ permissions, teacher }) => {
          if (PermissionHelper.getRole(permissions) === 'roomManager') {
            this.exportForRoomManager();
          } else {
            this.exportForTeacher(teacher);
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private handleCancel(): void {
    this.cancel$
      .pipe(
        withLatestFrom(this.nameTitle$),
        map(({ 1: title }) => title),
        switchMap((title) =>
          this.dialogService
            .showConfirmDialog({
              header: `${title} có chắc chắn muốn hủy yêu cầu này không?`,
              positive: 'Có',
              negative: 'Không',
            })
            .pipe(
              filter((x) => x),
              tap(() => this.store.cancel(this.schedule.id)),
            ),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private exportForRoomManager(): void {
    this.teacherService
      .getTeacherInfo(this.schedule.teacher.id)
      .pipe(
        ObservableHelper.filterNullish(),
        tap(({ data }) => {
          const document =
            this.exportService.exportChangeScheduleRequestForRoomManager(
              this.schedule,
              data,
            );

          const commonName = 'Giay-dang-ky-phong-hoc';
          const teacherName = StringHelper.toLatinText(
            this.schedule.teacher.name,
          )
            .split(' ')
            .join('-');
          const time =
            this.datePipe.transform(
              this.schedule.newSchedule.date,
              'dd-MM-Y',
            ) ??
            this.schedule.newSchedule.date ??
            '';
          const fileName = `${commonName}_${teacherName}_${time}.docx`;

          this.exportService.exportBlob({
            document,
            name: fileName,
            mimeType: FileType.WORD,
          });
        }),
      )
      .subscribe();
  }

  private exportForTeacher(teacher: Nullable<Teacher>): void {
    const document = this.exportService.exportChangeScheduleRequestForTeacher(
      [this.schedule],
      this.schedule.teacher.name ?? teacher?.name,
      teacher?.department?.name || '',
      this.schedule.reason,
    );

    const commonName = 'Giay-xin-thay-doi-gio-giang';
    const teacherName = StringHelper.toLatinText(
      this.schedule.teacher.name ?? teacher?.name,
    )
      .split(' ')
      .join('-');
    const createdAt =
      this.datePipe.transform(this.schedule.createdAt, 'dd-MM-Y') ??
      this.schedule.createdAt.toDateString();
    const fileName = `${commonName}_${teacherName}_${createdAt}.docx`;

    this.exportService.exportBlob({
      document,
      name: fileName,
      mimeType: FileType.WORD,
    });
  }
}
