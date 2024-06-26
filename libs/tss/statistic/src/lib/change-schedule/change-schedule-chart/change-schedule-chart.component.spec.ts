import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssStatisticChangeScheduleChartComponent } from './change-schedule-chart.component';

describe('ChangeScheduleChartComponent', () => {
  let component: TssStatisticChangeScheduleChartComponent;
  let fixture: ComponentFixture<TssStatisticChangeScheduleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssStatisticChangeScheduleChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssStatisticChangeScheduleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
