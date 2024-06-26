import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { TuiPaginationModule } from '@taiga-ui/kit';
import { Nullable } from '@utconnect/types';
import { TssTeachingScheduleChangeStore } from '../../change.store';

const TAIGA_UI = [TuiPaginationModule];

@Component({
  selector: 'tss-teaching-schedule-change-request-pagination',
  templateUrl: './change-request-pagination.component.html',
  styleUrls: ['./change-request-pagination.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
})
export class TssTeachingScheduleChangeRequestPaginationComponent {
  // INJECTIONS
  private readonly store = inject(TssTeachingScheduleChangeStore);

  // PUBLIC PROPERTIES
  selectedStatus: Nullable<number> = null;
  page$ = this.store.page$;
  pageCount$ = this.store.pageCount$;

  // PUBLIC METHODS
  onPageChange(page: number): void {
    this.store.changePage(page);
  }
}
