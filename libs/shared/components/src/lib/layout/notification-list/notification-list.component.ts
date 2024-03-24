import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  TuiActiveZoneDirective,
  TuiActiveZoneModule,
  TuiDestroyService,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
  tuiButtonOptionsProvider,
} from '@taiga-ui/core';
import { TuiLineClampModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { ObjectPipe, RelativeTimePipe } from '@utconnect/pipes';
import { NOTIFICATION_LIST_OPTIONS } from './notification-list.token';
import { NotificationType } from './types';

const TAIGA_UI = [
  TuiActiveZoneModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiHintModule,
  TuiLineClampModule,
  TuiMarkerIconModule,
  TuiSvgModule,
];

@Component({
  selector: 'utconnect-notification-list',
  templateUrl: './notification-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RelativeTimePipe,
    ...TAIGA_UI,
    ObjectPipe,
    NgOptimizedImage,
  ],
  providers: [
    TuiDestroyService,
    tuiButtonOptionsProvider({
      appearance: 'flat',
      shape: 'rounded',
      size: 's',
    }),
  ],
})
export class NotificationListComponent implements OnChanges {
  // INJECT PROPERTIES
  readonly options = inject(NOTIFICATION_LIST_OPTIONS);
  private readonly router = inject(Router);

  // INPUT
  @Input() data: Record<string, NotificationType> = {};
  @Input() hasNext: number[] = [];
  @Input() nameTitle?: string;
  @Input() activeZone?: TuiActiveZoneDirective;
  @Input() disableUnreadAll = true;

  // OUTPUT
  @Output() seeMore = new EventEmitter<string>();
  @Output() markAsRead = new EventEmitter<number>();
  @Output() markAllAsRead = new EventEmitter();

  openOptions = false;
  activeTab: string | null = null;

  // IMPLEMENTATIONS
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.activeTab = Object.keys(changes['data'])[0];
    }
  }

  // PUBLIC METHODS
  onClickSeeMore(): void {
    if (this.activeTab) {
      this.seeMore.emit(this.activeTab);
    }
  }

  async openNotification(): Promise<void> {
    await this.router.navigate(['/notification']);
    this.openOptions = false;
  }
}
