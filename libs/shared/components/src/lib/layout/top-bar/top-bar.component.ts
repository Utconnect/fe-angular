import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiHostedDropdownModule } from '@taiga-ui/core';
import { DynamicRouteComponentComponent } from '../../dynamic-route-component';
import { BellComponent } from '../bell';
import { TopBarMenuComponent } from './menu/menu.component';
import { TopBarService } from './top-bar.service';
import { TOP_BAR_OPTION_RIGHT_ITEM_TOKEN } from './top-bar.tokens';
import { TopBarUserComponent } from './user/user.component';

const NGRX = [LetModule];
const TAIGA_UI = [TuiButtonModule, TuiHostedDropdownModule];

@Component({
  selector: 'utconnect-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['top-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [TopBarService],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    BellComponent,
    DynamicRouteComponentComponent,
    TopBarUserComponent,
    TopBarMenuComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
})
export class TopBarComponent {
  // INJECT PROPERTIES
  readonly topBarService = inject(TopBarService);
  readonly rightItemOption = inject(TOP_BAR_OPTION_RIGHT_ITEM_TOKEN);
  readonly destroy$ = inject(TuiDestroyService);
}
