import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { fadeOut } from '@utconnect/animations';

@Component({
  selector: 'utconnect-screen-loader',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './screen-loader.component.html',
  styleUrls: ['./screen-loader.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeOut],
})
export class ScreenLoaderComponent {
  @Input() showLoader = false;
}
