import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssCalendarHeaderComponent } from './calendar-header.component';

describe('TssCalendarHeaderComponent', () => {
  let component: TssCalendarHeaderComponent;
  let fixture: ComponentFixture<TssCalendarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssCalendarHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssCalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
