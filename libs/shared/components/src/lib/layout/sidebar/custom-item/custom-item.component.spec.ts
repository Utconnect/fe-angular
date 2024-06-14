import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomItemComponent } from './custom-item.component';

describe('CustomItemComponent', () => {
  let component: CustomItemComponent;
  let fixture: ComponentFixture<CustomItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
