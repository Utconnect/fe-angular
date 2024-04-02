import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Injector,
  Output,
} from '@angular/core';
import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { ConfirmDialogComponent } from '@esm/dialog';
import { LetModule } from '@ngrx/component';
import {
  TuiButtonModule,
  TuiDialogService,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { InvigilatorAssignFacultyStore } from '../assign-faculty.store';

export const TAIGA_UI = [TuiButtonModule, TuiLoaderModule];

@Component({
  selector: 'esm-invigilator-assign-faculty-header',
  standalone: true,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvigilatorAssignFacultyHeaderComponent {
  // INJECT PROPERTIES
  private readonly store = inject(InvigilatorAssignFacultyStore);
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(TuiDialogService);

  @Output()
  readonly exportFile = new EventEmitter<void>();

  // PROPERTIES
  readonly ExaminationStatus = ESMDomainEnumsExaminationStatus;
  readonly headerObservables$ = this.store.headerObservables$;

  // PUBLIC METHODS
  calculate(): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(ConfirmDialogComponent, this.injector),
        {
          data: {
            message:
              'Thao tác này sẽ làm mới toàn bộ dữ liệu phân giảng trong kỳ thi. Vẫn tiếp tục?',
            onConfirm: this.store.calculate,
            confirmStatus: this.store.calculateStatus$,
          },
        },
      )
      .subscribe();
  }

  finishAssign(): void {
    this.store.finishAssign();
  }
}
