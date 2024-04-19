import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
import { TopBarComponent } from './top-bar';

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
  @Input() role: string | null = null;

  // PUBLIC PROPERTIES
  readonly showSideBar$ = new BehaviorSubject<boolean>(false);
  readonly isInCreatePage$ = new BehaviorSubject<boolean>(true);
  readonly commonPages = ['/create', '/data'];

  // LIFECYCLE
  constructor(private readonly route: ActivatedRoute) {
    this.triggerToggleSideBar();
    this.route.data.subscribe((data) => console.log(data));
  }

  // PRIVATE METHODS
  private triggerToggleSideBar(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        tap((e) => {
          e = e as NavigationEnd;
          this.showSideBar$.next(!this.isCommonPage(e.url));
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
