import {
  ChangeDetectorRef,
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[utconnectRole]',
  standalone: true,
})
export class RoleDirective {
  // INJECT PROPERTIES
  private elseThenTemplateRef = inject(TemplateRef<unknown>);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly thenTemplateRef = inject(TemplateRef<unknown>);

  // PRIVATE PROPERTIES
  private _role: string | null = null;
  private _acceptRole?: string[] | null;
  private hadElse = false;

  // SETTER
  @Input() set utconnectRole(acceptRoles: string | null) {
    this._role = acceptRoles;
    this.updateView();
  }

  @Input() set utconnectRoleAccept(acceptRoles: string[] | undefined | null) {
    this._acceptRole = acceptRoles;
    this.updateView();
  }

  @Input() set utconnectRoleElse(templateRef: TemplateRef<unknown>) {
    this.elseThenTemplateRef = templateRef;
    this.hadElse = true;
    this.updateView();
  }

  // CONSTRUCTOR
  constructor() {
    this.updateView();
  }

  // PRIVATE METHODS
  private updateView(): void {
    if (!this._role) {
      return;
    }

    if (!this._acceptRole || this._acceptRole.includes(this._role)) {
      this.viewContainerRef.createEmbeddedView(this.thenTemplateRef);
      this.cdr.detectChanges();
    } else if (this.hadElse) {
      this.viewContainerRef.createEmbeddedView(this.elseThenTemplateRef);
      this.cdr.detectChanges();
    }
  }
}
