import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DeviceHelper } from '@utconnect/helpers';

@Directive({
  selector: '[utconnectTouchScreen]',
  standalone: true,
})
export class TouchScreenDirective {
  // INJECTIONS
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly thenTemplateRef = inject(TemplateRef<unknown>);
  private elseThenTemplateRef = inject(TemplateRef<unknown>);

  // PRIVATE PROPERTIES
  private _touchScreen!: boolean;
  private hadElse = false;

  // SETTER
  @Input('utconnectTouchScreen') set touchScreen(_: null) {
    this._touchScreen = true;
    this.updateView();
  }

  @Input() set utconnectTouchScreenElse(templateRef: TemplateRef<unknown>) {
    this.hadElse = true;
    this.elseThenTemplateRef = templateRef;
    this.updateView();
  }

  private updateView(): void {
    this.viewContainerRef.clear();
    if (this._touchScreen && DeviceHelper.isTouchDevice()) {
      this.viewContainerRef.createEmbeddedView(this.thenTemplateRef);
    } else if (this.hadElse) {
      this.viewContainerRef.createEmbeddedView(this.elseThenTemplateRef);
    }
  }
}
