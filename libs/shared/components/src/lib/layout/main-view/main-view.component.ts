import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { routerFade } from '@utconnect/animations';

const TAIGA_UI = [TuiScrollbarModule];

@Component({
  selector: 'utconnect-main-view',
  standalone: true,
  imports: [CommonModule, RouterModule, TAIGA_UI],
  templateUrl: './main-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerFade],
})
export class MainViewComponent {
  // INPUT
  @Input() showSideBar!: boolean;
}
