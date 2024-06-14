import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssCalendarFilterComponent } from './calendar-filter.component';

describe('TssCalendarFilterComponent', () => {
  let component: TssCalendarFilterComponent;
  let fixture: ComponentFixture<TssCalendarFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssCalendarFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssCalendarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
