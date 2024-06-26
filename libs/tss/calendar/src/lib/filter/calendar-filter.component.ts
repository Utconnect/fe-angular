import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import {
  TuiActiveZoneDirective,
  TuiActiveZoneModule,
  TuiContextWithImplicit,
  TuiDestroyService,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiExpandModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiMultiSelectModule,
  TuiRadioLabeledModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { CalendarFilter } from '@tss/api';
import { PermissionConstant } from '@tss/constants';
import { SimpleModel } from '@utconnect/types';
import { takeUntil } from 'rxjs';
import { CalendarState } from '../store';
import { TssCalendarPageAction } from './../store/calendar.page.actions';
import { TssCalendarSelector } from './../store/calendar.selectors';

const NGRX = [LetModule];
const TAIGA_UI = [
  TuiActiveZoneModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiExpandModule,
  TuiMultiSelectModule,
  TuiRadioLabeledModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'tss-calendar-filter',
  templateUrl: './calendar-filter.component.html',
  styleUrls: ['./calendar-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, ...NGRX, ...TAIGA_UI],
  providers: [
    TuiDestroyService,
    tuiButtonOptionsProvider({
      appearance: 'flat',
      size: 'xs',
    }),
  ],
})
export class TssCalendarFilterComponent {
  // INJECTIONS
  private readonly store = inject(Store<CalendarState>);
  private readonly destroy$ = inject(TuiDestroyService);

  // INPUT
  @Input() activeZone!: TuiActiveZoneDirective;
  @Input() forMenu = false;

  // OUTPUT
  @Output() readonly filter = new EventEmitter<void>();

  // PUBLIC PROPERTIES
  readonly PermissionConstant = PermissionConstant;
  readonly filter$ = this.store
    .select(TssCalendarSelector.currentFilter)
    .pipe(takeUntil(this.destroy$));
  readonly teachers$ = this.store
    .select(TssCalendarSelector.teachers)
    .pipe(takeUntil(this.destroy$));
  readonly modules$ = this.store
    .select(TssCalendarSelector.modules)
    .pipe(takeUntil(this.destroy$));

  // PUBLIC METHODS
  @tuiPure
  stringifyTeacher(
    items: SimpleModel[],
  ): TuiStringHandler<TuiContextWithImplicit<string[]>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [string, string]),
    );

    return ({ $implicit }) =>
      $implicit.length === 0
        ? 'Tất cả'
        : $implicit.length === 1
        ? map.get($implicit[0]) || ''
        : `${$implicit.length} giảng viên`;
  }

  onChangeSelectingState(changes: Partial<CalendarFilter>): void {
    this.store.dispatch(
      TssCalendarPageAction.changeSelectingState({ changes }),
    );
  }

  onFilter(): void {
    this.store.dispatch(TssCalendarPageAction.filter());
    this.filter.emit();
  }
}
