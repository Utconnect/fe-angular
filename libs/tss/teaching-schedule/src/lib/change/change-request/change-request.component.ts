import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { TopBarService } from '@utconnect/components';
import { tap } from 'rxjs';
import { TssTeachingScheduleChangeStore } from './../change.store';
import { TssTeachingScheduleChangeRequestFilterComponent } from './change-request-filter';
import { TssTeachingScheduleChangeRequestListComponent } from './change-request-list';
import { TssTeachingScheduleChangeRequestMenuComponent } from './change-request-menu';
import { TssTeachingScheduleChangeRequestPaginationComponent } from './change-request-pagination';

const TAIGA_UI = [TuiScrollbarModule];

@Component({
  selector: 'tss-teaching-schedule-change-request',
  templateUrl: './change-request.component.html',
  styleUrls: ['./change-request.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TssTeachingScheduleChangeRequestFilterComponent,
    TssTeachingScheduleChangeRequestListComponent,
    TssTeachingScheduleChangeRequestMenuComponent,
    TssTeachingScheduleChangeRequestPaginationComponent,
    ...TAIGA_UI,
  ],
})
export class TssTeachingScheduleChangeRequestComponent
  implements AfterViewInit
{
  // INJECTIONS
  private readonly route = inject(ActivatedRoute);
  private readonly navbarService = inject(TopBarService);
  private readonly store = inject(TssTeachingScheduleChangeStore);

  // VIEWCHILD
  @ViewChild('rightMenu') rightMenuTemplate!: TemplateRef<never>;

  // PRIVATE PROPERTIES
  private readonly teacher$ = this.store.teacher$;

  // CONSTRUCTOR
  constructor() {
    const personal = this.route.snapshot.data['personal'] as boolean;
    this.store.reset(personal);

    if (personal) {
      this.handleSelectTeacher();
    } else {
      this.store.filter({
        status: [],
        page: 1,
      });
    }
  }

  // LIFECYCLE
  ngAfterViewInit(): void {
    this.navbarService.addRightMenu(this.rightMenuTemplate);
  }

  // PRIVATE METHODS
  private handleSelectTeacher(): void {
    this.teacher$
      .pipe(tap((teacher) => this.store.changeOptions({ teacher })))
      .subscribe();
  }
}
