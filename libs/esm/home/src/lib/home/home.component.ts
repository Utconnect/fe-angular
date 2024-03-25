import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiActionModule } from '@taiga-ui/kit';
import { HomeStore } from './home.store';

const NGRX = [LetModule];
const TAIGA_UI = [TuiActionModule, TuiLinkModule, TuiLoaderModule];

@Component({
  selector: 'esm-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ...NGRX, ...TAIGA_UI],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class EsmHomeComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly store = inject(HomeStore);

  // PUBLIC PROPERTIES
  readonly obs$ = this.store.obs$;

  ngOnInit(): void {
    this.store.getClosedExaminations();
  }
}
