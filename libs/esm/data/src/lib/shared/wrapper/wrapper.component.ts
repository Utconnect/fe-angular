import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiLinkModule } from '@taiga-ui/core';

export const TAIGA_UI = [TuiLinkModule];

@Component({
  templateUrl: './wrapper.component.html',
  standalone: true,
  imports: [RouterModule, ...TAIGA_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataWrapperComponent {}
