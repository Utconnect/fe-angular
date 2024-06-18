import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDialogService,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TssGoogleEventDialogComponent } from '@tss/dialog';
import { ObservableHelper } from '@utconnect/helpers';
import { DateRangePipe } from '@utconnect/pipes';
import { EjsScheduleModel } from '@utconnect/types';
import { tap } from 'rxjs';

const TAIGA_UI = [
  TuiButtonModule,
  TuiInputModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'tss-calendar-quick-info-content-cell',
  templateUrl: './quick-info-content-cell.component.html',
  styleUrls: ['./quick-info-content-cell.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, DatePipe, DateRangePipe, ...TAIGA_UI],
})
export class TssCalendarQuickInfoContentCellComponent {
  // INJECTIONS
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(TuiDialogService);

  // INPUT
  @Input() data!: EjsScheduleModel;

  // PUBLIC PROPERTIES
  newEventTitle = '';

  // PUBLIC METHODS
  create(): void {
    this.dialogService
      .open<Partial<EjsScheduleModel> | undefined>(
        new PolymorpheusComponent(TssGoogleEventDialogComponent, this.injector),
        {
          data: {
            ...this.data,
            Subject: this.newEventTitle,
          },
          label: 'Tạo sự kiện',
          closeable: false,
          dismissible: false,
          size: 'l',
        },
      )
      .pipe(
        ObservableHelper.filterUndefined(),
        tap((_) => {
          // TODO: Update ejs calendar after create event successfully
          // this.scheduleComponent.saveEvent({ ...data, ...newData });
        }),
      )
      .subscribe();
  }
}
