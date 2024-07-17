import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
import { ExportService } from '@tss/api';
import { TssChangeReportDialogComponent } from '@tss/dialog';
import { FileType } from '@tss/types';
import { IconConstant } from '@utconnect/constants';
import { StringHelper } from '@utconnect/helpers';
import { Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
import { TssTeachingScheduleChangeStore } from '../../change.store';
import { TssTeachingScheduleChangeRequestFilterLeftComponent } from '../change-request-filter-left';

const TAIGA_UI = [TuiButtonModule];

@Component({
  selector: 'tss-teaching-schedule-change-request-filter',
  templateUrl: './change-request-filter.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TuiDestroyService,
    tuiButtonOptionsProvider({
      appearance: 'primary',
      size: 's',
    }),
  ],
  imports: [
    CommonModule,
    LetModule,
    TssTeachingScheduleChangeRequestFilterLeftComponent,
    ...TAIGA_UI,
  ],
})
export class TssTeachingScheduleChangeRequestFilterComponent {
  // INJECTIONS
  private readonly exportService = inject(ExportService);
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(TuiDialogService);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(TssTeachingScheduleChangeStore);

  // PUBLIC PROPERTIES
  readonly exportMultiple$ = new Subject<void>();
  readonly IconConstant = IconConstant;
  readonly exportSchedule$ = this.store.exportSchedule$;
  readonly isPersonal = this.route.snapshot.data['personal'] as boolean;

  // PRIVATE PROPERTIES
  private readonly teacher$ = this.store.teacher$;
  private dialog$ = this.dialogService.open(
    new PolymorpheusComponent(TssChangeReportDialogComponent, this.injector),
    {
      label: 'Xuất báo cáo thay đổi giờ giảng',
      dismissible: false,
    },
  );

  // CONSTRUCTOR
  constructor() {
    this.handleExportMultiple();
  }

  // PUBLIC METHODS
  onExport(): void {
    this.dialog$.subscribe();
  }

  // PRIVATE METHODS
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
