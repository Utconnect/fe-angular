import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButtonModule, tuiButtonOptionsProvider } from '@taiga-ui/core';
import { fadeInOut } from '@utconnect/animations';
import { TopBarCreateButtonStore } from './top-bar-create-button.store';

export const TAIGA_UI = [TuiButtonModule];

@Component({
  selector: 'esm-component-top-bar-create-button',
  standalone: true,
  imports: [CommonModule, RouterModule, ...TAIGA_UI],
  templateUrl: './top-bar-create-button.component.html',
  styleUrls: ['./top-bar-create-button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TopBarCreateButtonStore,
    tuiButtonOptionsProvider({
      appearance: 'icon',
      size: 'm',
    }),
  ],
  animations: [fadeInOut],
})
export class TopBarCreateButtonComponent {
  // INJECT PROPERTIES
  private readonly store = inject(TopBarCreateButtonStore);

  // HOST BINDING
  @HostBinding('@fadeInOut') animate = true;

  // PUBLIC PROPERTIES
  readonly isInvigilator$ = this.store.isInvigilator$;
}
