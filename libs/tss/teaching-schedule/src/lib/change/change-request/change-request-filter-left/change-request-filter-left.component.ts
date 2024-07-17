import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LetModule } from '@ngrx/component';
import {
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiCheckboxLabeledModule, TuiSelectModule } from '@taiga-ui/kit';
import { ChangeScheduleOptionsParam } from '@tss/api';
import { ScheduleConstant } from '@tss/constants';
import { ObjectHelper } from '@utconnect/helpers';
import { TssTeachingScheduleChangeStore } from '../../change.store';

const TAIGA_UI = [
  TuiCheckboxLabeledModule,
  TuiDataListModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'tss-teaching-schedule-change-request-filter-left',
  templateUrl: './change-request-filter-left.component.html',
  styleUrls: ['./change-request-filter-left.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, LetModule, ...TAIGA_UI],
})
export class TssTeachingScheduleChangeRequestFilterLeftComponent {
  // INJECTIONS
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(TssTeachingScheduleChangeStore);

  // INPUT
  @Input() forMenu = false;

  // PUBLIC PROPERTIES
  readonly statusList = ScheduleConstant.REQUEST_CHANGE_SCHEDULE_STATUS;
  readonly statusArray = ObjectHelper.toArray(this.statusList, {
    uniqueValue: true,
  }).sort((a, b) => (a.id as number) - (b.id as number));
  readonly options$ = this.store.options$;
  readonly isPersonal = this.route.snapshot.data['personal'] as boolean;

  // PUBLIC METHODS
  changeOptions(options: ChangeScheduleOptionsParam): void {
    this.store.changeOptions(options);
  }
}
