import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { RANGE_SEPARATOR_CHAR, TuiDayRange } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';
import { InputDateRangeComponent, TopBarService } from '@utconnect/components';
import { IconConstant } from '@utconnect/constants';
import { DateHelper, ObservableHelper } from '@utconnect/helpers';
import { take, tap } from 'rxjs';
import { TssStatisticChangeScheduleStore } from '../store';
import { TssStatisticChangeScheduleFilterExportDirective } from './tss-statistic-change-schedule-filter-export';

const TAIGA_UI = [TuiButtonModule];

@Component({
  selector: 'tss-statistic-change-schedule-filter',
  templateUrl: './change-schedule-filter.component.html',
  styleUrls: ['./change-schedule-filter.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LetModule,
    InputDateRangeComponent,
    TssStatisticChangeScheduleFilterExportDirective,
    ...TAIGA_UI,
  ],
  providers: [
    {
      provide: RANGE_SEPARATOR_CHAR,
      useValue: ',',
    },
  ],
})
export class TssStatisticChangeScheduleFilterComponent
  implements OnInit, AfterViewInit
{
  // INJECTIONS
  private readonly fb = inject(FormBuilder);
  private readonly topBarService = inject(TopBarService);
  private readonly store = inject(TssStatisticChangeScheduleStore);

  // VIEWCHILD
  @ViewChild('export') exportTemplate!: TemplateRef<never>;

  // PUBLIC PROPERTIES
  form!: FormGroup;

  readonly IconConstant = IconConstant;
  readonly status$ = this.store.status$;

  // PRIVATE PROPERTIES
  private readonly teacher$ = this.store.teacher$;

  // GETTERS
  private get rangeControlValue(): TuiDayRange {
    return this.form.controls['range'].value as TuiDayRange;
  }

  // CONSTRUCTOR
  constructor() {
    this.initForm();
  }

  // LIFECYCLE
  ngOnInit(): void {
    this.statisticizeFirstTime();
  }

  ngAfterViewInit(): void {
    this.topBarService.addRightMenu(this.exportTemplate);
  }

  // PUBLIC METHODS
  statisticize(): void {
    const range = this.rangeControlValue;
    if (range) {
      this.store.statisticize({ range });
    }
  }

  // PRIVATE METHODS
  private initForm(): void {
    this.form = this.fb.group({
      range: [DateHelper.getPreviousMonthRange(), Validators.required],
    });
  }

  private statisticizeFirstTime(): void {
    this.teacher$
      .pipe(
        ObservableHelper.filterNullish(),
        tap(() => this.statisticize()),
        take(1),
      )
      .subscribe();
  }
}
