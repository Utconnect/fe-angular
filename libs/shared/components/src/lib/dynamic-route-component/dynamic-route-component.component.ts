import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  inject,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { ComponentRouteMapper } from '@utconnect/types';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'utconnect-dynamic-route-component',
  template: '<ng-template #dynamicComponent></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  providers: [TuiDestroyService],
})
export class DynamicRouteComponentComponent implements AfterViewInit {
  // INJECT PROPERTIES
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly destroy$ = inject(TuiDestroyService);

  // INPUT
  @Input() mapper: ComponentRouteMapper = [];

  // VIEW CHILD
  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  dynamicComponentVcr?: ViewContainerRef;

  // PRIVATE PROPERTIES
  private currentComponent: ComponentRef<unknown> | null = null;

  // LIFECYCLE
  ngAfterViewInit(): void {
    this.updateComponentOnNavigation(this.router.url, true);

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.updateComponentOnNavigation(event.url);
      }
    });
  }

  // PRIVATE METHODS
  private updateComponentOnNavigation(url: string, firstTime = false): void {
    if (!this.dynamicComponentVcr) {
      return;
    }

    const componentToGenerate = this.getComponent(url);
    if (!componentToGenerate) {
      this.currentComponent?.destroy();
      this.currentComponent = null;
      return;
    }

    // Always fell in this condition at first time
    if (!this.currentComponent) {
      this.currentComponent =
        this.dynamicComponentVcr.createComponent(componentToGenerate);
      if (firstTime) {
        this.currentComponent.changeDetectorRef.detectChanges();
      } else {
        this.cdr.markForCheck();
      }
      return;
    }

    if (this.currentComponent.componentType.name !== componentToGenerate.name) {
      this.currentComponent.destroy();
      this.currentComponent =
        this.dynamicComponentVcr.createComponent(componentToGenerate);
      this.cdr.markForCheck();
    }
  }

  private getComponent(url: string): Type<unknown> | null {
    for (const item of this.mapper) {
      if ('paths' in item) {
        for (const path of item.paths) {
          if (url.startsWith(path)) {
            return item.component;
          }
        }
        continue;
      }

      if (item.path === '*') {
        return item.component;
      }

      if (url.startsWith(item.path)) {
        return item.component;
      }
    }

    return null;
  }
}
