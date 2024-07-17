import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { TuiPaginationModule } from '@taiga-ui/kit';
import { TssTeachingScheduleChangeStore } from '../../change.store';

const TAIGA_UI = [TuiPaginationModule];

@Component({
  selector: 'tss-teaching-schedule-change-request-pagination',
  templateUrl: './change-request-pagination.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
})
export class TssTeachingScheduleChangeRequestPaginationComponent {
  // INJECTIONS
  private readonly store = inject(TssTeachingScheduleChangeStore);

  // PUBLIC PROPERTIES
  page$ = this.store.page$;
  pageCount$ = this.store.pageCount$;

  // PUBLIC METHODS
  onPageChange(page: number): void {
    this.store.changePage(page);
  }
}
