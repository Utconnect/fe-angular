import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
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
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly thenTemplateRef = inject(TemplateRef<unknown>);

  // PRIVATE PROPERTIES
  private _acceptRoles?: string[] | null;
  private _roles: string[] = [];
  private elseThenTemplateRef?: TemplateRef<unknown>;
  private evr?: EmbeddedViewRef<unknown>;

  // SETTER
  @Input() set utconnectRole(roles: string[]) {
    this._roles = roles;
    this.updateView();
  }

  @Input() set utconnectRoleAccept(acceptRoles: string[] | undefined | null) {
    this._acceptRoles = acceptRoles;
    this.updateView();
  }

  @Input() set utconnectRoleElse(templateRef: TemplateRef<unknown>) {
    this.elseThenTemplateRef = templateRef;
    this.updateView();
  }

  // CONSTRUCTOR
  constructor() {
    this.updateView();
  }

  // PRIVATE METHODS
  private updateView(): void {
    if (!this._roles || this._roles.length === 0) {
      return;
    }

    if (
      !this._acceptRoles ||
      this._acceptRoles.length === 0 ||
      this._acceptRoles.find((acceptRole) => this._roles.includes(acceptRole))
    ) {
      this.evr?.destroy();
      this.evr = this.viewContainerRef.createEmbeddedView(this.thenTemplateRef);
      this.cdr.detectChanges();
    } else if (this.elseThenTemplateRef) {
      this.evr?.destroy();
      this.evr = this.viewContainerRef.createEmbeddedView(
        this.elseThenTemplateRef,
      );
      this.cdr.detectChanges();
    }
  }
}
