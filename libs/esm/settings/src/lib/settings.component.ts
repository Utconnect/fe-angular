import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiActionModule } from '@taiga-ui/kit';

const TAIGA_UI = [TuiActionModule, TuiLoaderModule];

@Component({
  selector: 'esm-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, LetModule, ...TAIGA_UI],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {}
