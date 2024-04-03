import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { LetModule } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import {
  TuiAlertService,
  tuiButtonOptionsProvider,
  TuiNotification,
} from '@taiga-ui/core';
import { RequiredStepComponent } from '@utconnect/components';
import { ArrayPipe } from '@utconnect/pipes';
import { Status } from '@utconnect/types';
import { Observable, of, switchMap } from 'rxjs';
import { InvigilatorAssignTeacherStore } from './assign-teacher.store';
import { InvigilatorAssignTeacherHeaderComponent } from './header/header.component';
import { InvigilatorAssignTeacherTableComponent } from './table/table.component';

export const NGRX = [LetModule];

@Component({
  templateUrl: './assign-teacher.component.html',
  styleUrls: ['./assign-teacher.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    provideComponentStore(InvigilatorAssignTeacherStore),
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    LetModule,
    ArrayPipe,
    InvigilatorAssignTeacherHeaderComponent,
    InvigilatorAssignTeacherTableComponent,
    RequiredStepComponent,
    ...NGRX,
  ],
})
export class InvigilatorAssignTeacherComponent implements OnInit {
  // INJECTS
  private readonly alertService = inject(TuiAlertService);
  private readonly store = inject(InvigilatorAssignTeacherStore);

  // VIEW CHILD
  @ViewChild('table')
  table?: InvigilatorAssignTeacherTableComponent;

  // PROPERTIES
  readonly ExaminationStatus = ESMDomainEnumsExaminationStatus;
  readonly roles$ = this.store.roles$;
  readonly dataStatus$ = this.store.dataStatus$;
  readonly updateStatus$ = this.store.updateStatus$;
  readonly autoAssignStatus$ = this.store.autoAssignStatus$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleUpdateStatusChanges();
  }

  // PUBLIC METHODS
  readonly getDataFunc = (): void => {
    this.store.getData();
    this.store.getInvigilatorsData();
  };

  // PRIVATE METHODS
  private handleUpdateStatusChanges(): void {
    const func = (status: Status): Observable<void> => {
      if (status === 'success')
        return this.alertService.open('Cập nhật thành công!', {
          status: TuiNotification.Success,
        });

      if (status === 'error')
        return this.alertService.open(
          'Đã có lỗi xảy ra, vui lòng thử lại sau!',
          {
            label: 'Lỗi',
            status: TuiNotification.Error,
          },
        );

      return of();
    };

    this.updateStatus$.pipe(switchMap(func)).subscribe();
    this.autoAssignStatus$.pipe(switchMap(func)).subscribe();
  }
}
