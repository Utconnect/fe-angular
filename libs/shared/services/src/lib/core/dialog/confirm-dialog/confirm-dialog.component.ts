import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiDialog } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogOptions,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ConfirmDialogOptions } from '../dialog-options';

@Component({
  templateUrl: './confirm-dialog.component.html',
  imports: [CommonModule, TuiButtonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'primary',
      size: 'm',
    }),
  ],
})
export class ConfirmDialogComponent<T extends ConfirmDialogOptions> {
  // INJECTIONS
  public readonly context =
    inject<TuiDialog<TuiDialogOptions<T>, boolean>>(POLYMORPHEUS_CONTEXT);

  // PUBLIC METHODS
  onClick(response: boolean): void {
    setTimeout(() => {
      this.context.completeWith(response);
    });
  }
}
