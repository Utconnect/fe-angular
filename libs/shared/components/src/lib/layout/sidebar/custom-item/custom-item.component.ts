import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'utconnect-sidebar-custom-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-item.component.html',
  styleUrls: ['./custom-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomItemComponent implements OnInit {
  // INPUT
  @Input() factory!: () => Promise<Type<unknown>>;

  // VIEW CHILD
  @ViewChild('vcr', { read: ViewContainerRef, static: true })
  public vcr!: ViewContainerRef;

  // LIFECYCLE
  ngOnInit(): void {
    this.factory().then((component) => {
      this.vcr.createComponent(component);
    });
  }
}
