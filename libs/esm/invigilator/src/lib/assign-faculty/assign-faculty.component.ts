import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { LetModule } from '@ngrx/component';
import {
  TuiAlertService,
  tuiButtonOptionsProvider,
  TuiLoaderModule,
  TuiNotification,
} from '@taiga-ui/core';
import { RequiredStepComponent } from '@utconnect/components';
import { of, Subscription, switchMap } from 'rxjs';
import { InvigilatorAssignFacultyStore } from './assign-faculty.store';
import { InvigilatorAssignFacultyHeaderComponent } from './header/header.component';
import { InvigilatorAssignFacultyTableComponent } from './table/table.component';

export const NGRX = [LetModule];
export const TAIGA_UI = [TuiLoaderModule];

@Component({
  templateUrl: './assign-faculty.component.html',
  styleUrls: ['./assign-faculty.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    InvigilatorAssignFacultyStore,
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
  imports: [
    CommonModule,
    RequiredStepComponent,
    InvigilatorAssignFacultyHeaderComponent,
    InvigilatorAssignFacultyTableComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
})
export class InvigilatorAssignFacultyComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly store = inject(InvigilatorAssignFacultyStore);
  private readonly alertService = inject(TuiAlertService);

  // VIEW CHILD
  @ViewChild('table')
  table?: InvigilatorAssignFacultyTableComponent;

  // PROPERTIES
  readonly ExaminationStatus = ESMDomainEnumsExaminationStatus;
  readonly dataStatus$ = this.store.dataStatus$;
  private readonly finishStatus$ = this.store.finishStatus$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleFinish();
  }

  // PUBLIC METHODS
  readonly getDataFunc = (): Subscription => this.store.getData();

  // PRIVATE METHODS
  private handleFinish(): void {
    this.finishStatus$
      .pipe(
        switchMap((status) => {
          if (status === 'success')
            return this.alertService.open('Đã chốt số lượng CBCT!', {
              status: TuiNotification.Success,
            });

          if (status === 'error')
            return this.alertService.open(
              'Số lượng CBCT thực tế khác so với CBCT cần thiết, vui lòng kiểm tra lại!',
              {
                label: 'Lỗi',
                status: TuiNotification.Error,
              },
            );

          return of();
        }),
      )
      .subscribe();
  }
}
