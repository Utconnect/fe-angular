import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiMobileCalendarDialogComponent } from '@taiga-ui/addon-mobile';
import { tuiControlValue, TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDialogService,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiInputDateRangeModule,
  TUI_CALENDAR_DATE_STREAM,
  TUI_DONE_WORD,
} from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TouchScreenDirective } from '@utconnect/directives';
import { DateHelper } from '@utconnect/helpers';
import { Nullable } from '@utconnect/types';
import { Observable, of, tap } from 'rxjs';
import { InputDateRangeDateTextPipe } from './date-text';

const TAIGA_UI = [
  TuiButtonModule,
  TuiInputDateRangeModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'utconnect-input-date-range',
  templateUrl: './input-date-range.component.html',
  styleUrls: ['./input-date-range.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TouchScreenDirective,
    InputDateRangeDateTextPipe,
    ...TAIGA_UI,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputDateRangeComponent,
    },
  ],
})
export class InputDateRangeComponent {
  // INJECTIONS
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(TuiDialogService);

  // PUBLIC PROPERTIES
  readonly items = DateHelper.getPeriods();
  readonly min = new TuiDay(2021, 10, 1);
  control = new FormControl();

  // PRIVATE PROPERTIES
  private dialog$!: Observable<TuiDayRange>;
  private onChange!: (value: Nullable<TuiDayRange>) => void;

  // CONSTRUCTOR
  constructor() {
    this.initDialog();
  }

  // IMPLEMENTATIONS
  writeValue(value: Nullable<TuiDayRange>): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: (value: Nullable<TuiDayRange>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(): void {
    // Do nothing
  }

  // PUBLIC METHODS
  onOpenTouchDialog(): void {
    this.dialog$
      .pipe(tap((value) => this.onValueChange(value, true)))
      .subscribe();
  }

  onValueChange(value: Nullable<TuiDayRange>, needSetValue = false): void {
    if (needSetValue) {
      this.control.setValue(value);
    }
    this.onChange(value);
  }

  // PRIVATE METHODS
  private initDialog(): void {
    const content = this.getMobileDialogContent(this.injector, this.control);

    this.dialog$ = this.dialogService.open(content, {
      size: 'fullscreen',
      closeable: false,
      data: {
        single: false,
        min: this.min,
      },
    });
  }

  private getMobileDialogContent(
    injector: Injector,
    control: AbstractControl,
  ): PolymorpheusComponent<TuiMobileCalendarDialogComponent, object> {
    return new PolymorpheusComponent(
      TuiMobileCalendarDialogComponent,
      Injector.create({
        providers: [
          {
            provide: TUI_CALENDAR_DATE_STREAM,
            useValue: tuiControlValue(control),
          },
          {
            provide: TUI_DONE_WORD,
            useValue: of('Xong'),
          },
        ],
        parent: injector,
      }),
    );
  }
}
