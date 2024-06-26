import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssStatisticChangeScheduleComponent } from './change-schedule.component';

describe('TssStatisticChangeScheduleComponent', () => {
  let component: TssStatisticChangeScheduleComponent;
  let fixture: ComponentFixture<TssStatisticChangeScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssStatisticChangeScheduleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssStatisticChangeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
