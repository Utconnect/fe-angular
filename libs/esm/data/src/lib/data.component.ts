import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { tuiIconUserLarge, tuiIconUsersLarge } from '@taiga-ui/icons';
import { TuiActionModule } from '@taiga-ui/kit';

export const TAIGA_UI = [TuiActionModule];

type Link = {
  url: string;
  label: string;
  icon: string;
};

@Component({
  templateUrl: './data.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, ...TAIGA_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataComponent {
  readonly links: Link[] = [
    {
      url: 'faculty',
      label: 'Khoa',
      icon: tuiIconUsersLarge,
    },
    {
      url: 'department',
      label: 'Bộ môn',
      icon: tuiIconUsersLarge,
    },
    {
      url: 'invigilator',
      label: 'CBCT',
      icon: tuiIconUserLarge,
    },
  ];
}
