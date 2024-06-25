import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogService,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ChangeSchedule, ExportService, Teacher } from '@tss/api';
import { TssChangeReportDialogComponent } from '@tss/dialog';
import { FileType } from '@tss/types';
import { IconConstant } from '@utconnect/constants';
import { StringHelper } from '@utconnect/helpers';
import { Observable, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
import { TssTeachingScheduleChangeStore } from '../../change.store';

const TAIGA_UI = [TuiButtonModule];

@Component({
  selector: 'tss-teaching-schedule-change-request-filter',
  templateUrl: './change-request-filter.component.html',
  styleUrls: ['./change-request-filter.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
  providers: [
    TuiDestroyService,
    tuiButtonOptionsProvider({
      appearance: 'primary',
      size: 's',
    }),
  ],
})
export class ChangeRequestFilterComponent {
  // PUBLIC PROPERTIES
  readonly exportMultiple$ = new Subject<void>();
  readonly IconConstant = IconConstant;
  readonly exportSchedule$: Observable<ChangeSchedule[]>;
  readonly isPersonal: boolean;

  // PRIVATE PROPERTIES
  private readonly teacher$: Observable<Teacher>;
  private dialog$!: Observable<void>;

  // CONSTRUCTOR
  constructor(
    private readonly exportService: ExportService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private readonly destroy$: TuiDestroyService,
    route: ActivatedRoute,
    store: TssTeachingScheduleChangeStore,
  ) {
    this.teacher$ = store.teacher$;
    this.exportSchedule$ = store.exportSchedule$;

    this.isPersonal = route.snapshot.data['personal'] as boolean;

    this.initDialog();
    this.handleExportMultiple();
  }

  // PUBLIC METHODS
  onExport(): void {
    this.dialog$.subscribe();
  }

  // PRIVATE METHODS
  private initDialog(): void {
    this.dialog$ = this.dialogService.open(
      new PolymorpheusComponent(TssChangeReportDialogComponent, this.injector),
      {
        label: 'Xuất báo cáo thay đổi giờ giảng',
        dismissible: false,
      },
    );
  }

  private handleExportMultiple(): void {
    this.exportMultiple$
      .pipe(
        withLatestFrom(this.exportSchedule$, this.teacher$),
        tap(({ 1: schedules, 2: teacher }) => {
          const document =
            this.exportService.exportChangeScheduleRequestForTeacher(
              schedules,
              teacher.name,
              teacher.department?.name || '',
              schedules[0].reason,
            );

          const commonName = 'Giay-xin-thay-doi-gio-giang';
          const teacherName = StringHelper.toLatinText(teacher.name)
            .split(' ')
            .join('-');
          const fileName = `${commonName}_${teacherName}.docx`;

          this.exportService.exportBlob({
            document,
            name: fileName,
            mimeType: FileType.WORD,
          });
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
