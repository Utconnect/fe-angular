import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TuiAccordionModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { TssPageAction, TssState } from '@tss/store';
import { SidebarField } from '@tss/types';

const TAIGA_UI = [TuiAccordionModule, TuiCheckboxLabeledModule];

@Component({
  selector: 'tss-sidebar-calendar-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...TAIGA_UI],
  templateUrl: './calendar-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarItemComponent {
  // INJECTIONS
  private readonly router = inject(Router);

  // PUBLIC PROPERTIES
  readonly name = 'Lịch biểu';

  // PRIVATE PROPERTIES
  private readonly store = inject(Store<TssState>);

  onClick(): void {
    this.router.navigate(['/calendar']);
  }

  onClickCheckbox(controlName: string, value: boolean): void {
    const name = controlName as SidebarField;
    this.store.dispatch(
      TssPageAction.sidebarEmit({
        event: {
          name,
          value,
        },
      }),
    );
  }
}
