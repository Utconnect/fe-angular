import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { Teacher } from '@tss/api';
import { TopBarService } from '@utconnect/components';
import { Observable, tap } from 'rxjs';
import { TssTeachingScheduleChangeStore } from './../change.store';

const TAIGA_UI = [TuiScrollbarModule];

@Component({
  selector: 'tss-teaching-schedule-change-request',
  templateUrl: './change-request.component.html',
  styleUrls: ['./change-request.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ...TAIGA_UI],
})
export class TssTeachingScheduleChangeRequestComponent
  implements AfterViewInit
{
  // VIEWCHILD
  @ViewChild('rightMenu') rightMenuTemplate!: TemplateRef<never>;

  // PRIVATE PROPERTIES
  private readonly teacher$: Observable<Teacher>;

  // CONSTRUCTOR
  constructor(
    private readonly navbarService: TopBarService,
    private readonly store: TssTeachingScheduleChangeStore,
    route: ActivatedRoute,
  ) {
    const personal = route.snapshot.data['personal'] as boolean;
    store.reset(personal);

    this.teacher$ = store.teacher$;

    if (personal) {
      this.handleSelectTeacher();
    } else {
      store.filter({
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
