import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { MainViewComponent } from './main-view';
import { SideBarComponent } from './side-bar';
import { SidebarItem } from './side-bar/side-bar.types';
import { TopBarComponent } from './top-bar';
import { TopBarGroup } from './top-bar/top-bar.types';

const TAIGA_UI = [
  TuiAccordionModule,
  TuiCheckboxLabeledModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
];

@Component({
  selector: 'utconnect-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    SideBarComponent,
    MainViewComponent,
    ...TAIGA_UI,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  // INJECT PROPERTIES
  private readonly router = inject(Router);

  // INPUT
  @Input() topBarMenuText?: string;
  @Input() topBarItems: TopBarGroup[] = [];
  @Input() role: string | null = null;
  @Input() sideBarItems: SidebarItem[] = [];

  // PUBLIC PROPERTIES
  readonly isInCommonPage$ = new BehaviorSubject<boolean>(true);
  readonly isInCreatePage$ = new BehaviorSubject<boolean>(true);
  readonly commonPages = ['/create', '/data'];

  // LIFECYCLE
  constructor() {
    this.triggerToggleSideBar();
  }

  // PRIVATE METHODS
  private triggerToggleSideBar(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        tap((e) => {
          e = e as NavigationEnd;
          this.isInCommonPage$.next(this.isCommonPage(e.url));
          this.isInCreatePage$.next(e.url === '/create');
        }),
      )
      .subscribe();
  }

  private isCommonPage(url: string): boolean {
    return (
      url === '/' ||
      this.commonPages.find((p) => url.startsWith(p)) !== undefined
    );
  }
}
