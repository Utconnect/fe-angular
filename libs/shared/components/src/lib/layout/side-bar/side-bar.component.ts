import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { RoleDirective } from '@utconnect/directives';
import { SIDE_BAR_OPTIONS_TOKEN } from './side-bar.tokens';

const TAIGA_UI = [
  TuiAccordionModule,
  TuiCheckboxLabeledModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
];

@Component({
  selector: 'utconnect-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, RoleDirective, ...TAIGA_UI],
})
export class SideBarComponent {
  // INJECT PROPERTIES
  readonly options = inject(SIDE_BAR_OPTIONS_TOKEN);

  // INPUTS
  @Input() role: string | null = null;
}
