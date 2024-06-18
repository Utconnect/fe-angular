import {
  Directive,
  HostListener,
  inject,
  Injector,
  Input,
} from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { FixedScheduleModel, Nullable } from '@utconnect/types';
import { TssChangeScheduleHistoryDialogComponent } from '../../change-schedule-history';

@Directive({
  selector: '[tssTeachingHistory]',
  standalone: true,
})
export class TssTeachingDialogHistoryDirective {
  private readonly injector = inject(Injector);
  private readonly tuiDialogService = inject(TuiDialogService);

  // INPUT
  @Input('tssTeachingHistory') fixedSchedules!: Nullable<FixedScheduleModel[]>;

  // PUBLIC METHODS
  @HostListener('click') onClick(): void {
    this.tuiDialogService
      .open(
        new PolymorpheusComponent(
          TssChangeScheduleHistoryDialogComponent,
          this.injector,
        ),
        {
          data: this.fixedSchedules || [],
          label: 'Lịch sử thay đổi giờ giảng',
        },
      )
      .subscribe();
  }
}
