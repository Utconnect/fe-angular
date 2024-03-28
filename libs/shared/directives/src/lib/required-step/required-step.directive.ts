import {
  ChangeDetectorRef,
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ObjectHelper } from '@utconnect/helpers';

@Directive({
  selector: '[utconnectRequiredStep]',
  standalone: true,
})
export class RequiredStepDirective<T, TStep> {
  // INJECT PROPERTIES
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private elseTemplateRef: TemplateRef<RequiredStepContext<T, TStep>> | null =
    null;
  private readonly thenTemplateRef = inject(
    TemplateRef<RequiredStepContext<T, TStep>>,
  );

  // PRIVATE PROPERTIES
  private _minimumStep: TStep | null = null;
  private _data: T | null = null;

  // INPUTS
  @Input() field!: keyof T;
  @Input() utconnectRequiredStepLoad?: () => void;

  @Input('utconnectRequiredStep')
  set minimumStep(step: TStep) {
    this._minimumStep = step;
    this.updateView();
  }

  @Input()
  set utconnectRequiredStepData(data: T) {
    this._data = data;
    this.updateView();
  }

  @Input()
  set utconnectRequiredStepElse(
    templateRef: TemplateRef<RequiredStepContext<T, TStep>> | null,
  ) {
    this.elseTemplateRef = templateRef;
    this.updateView();
  }

  get currentStep(): TStep | null {
    if (!this._data) {
      return null;
    }
    return this._data[this.field] as TStep;
  }

  // PRIVATE METHODS
  private updateView(): void {
    const context = new RequiredStepContext<T, TStep>(
      this._minimumStep,
      this.currentStep,
      this._data,
    );

    this.viewContainerRef.clear();

    if (
      ObjectHelper.isNullOrUndefined(this._minimumStep) ||
      ObjectHelper.isNullOrUndefined(this.currentStep) ||
      ObjectHelper.isNullOrUndefined(this._minimumStep) ||
      this.currentStep >= this._minimumStep
    ) {
      this.viewContainerRef.createEmbeddedView(this.thenTemplateRef, context);
      this.cdr.detectChanges();
      this.utconnectRequiredStepLoad?.();
    } else if (this.elseTemplateRef) {
      this.viewContainerRef.createEmbeddedView(this.elseTemplateRef, context);
      this.cdr.detectChanges();
    }
  }
}

export class RequiredStepContext<T, TStep> {
  constructor(
    public $implicit: TStep | null,
    public step: TStep | null,
    public examination: T | null,
  ) {}
}
