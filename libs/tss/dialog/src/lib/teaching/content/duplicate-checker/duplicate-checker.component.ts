import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { LetModule } from '@ngrx/component';
import {
  TuiExpandModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { fadeIn } from '@utconnect/animations';
import { TssTeachingDialogStore } from '../../store';

const TAIGA_UI = [
  TuiSvgModule,
  TuiExpandModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
  TuiLoaderModule,
];

@Component({
  selector: 'tss-teaching-dialog-content-duplicate-checker',
  templateUrl: './duplicate-checker.component.html',
  styleUrls: ['./duplicate-checker.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
  animations: [fadeIn],
})
export class TssTeachingDialogContentDuplicateCheckerComponent {
  // INJECTIONS
  private readonly store = inject(TssTeachingDialogStore);

  // INPUT
  @Input() sameData!: boolean;
  @Input() hadReason!: boolean;

  // PUBLIC PROPERTIES
  readonly searchStatus$ = this.store.status$('search');
  readonly searchSchedule$ = this.store.searchSchedule$;
}
