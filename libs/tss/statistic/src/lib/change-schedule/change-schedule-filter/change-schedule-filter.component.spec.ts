import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssStatisticChangeScheduleFilterComponent } from './change-schedule-filter.component';

describe('ChangeScheduleFilterComponent', () => {
  let component: TssStatisticChangeScheduleFilterComponent;
  let fixture: ComponentFixture<TssStatisticChangeScheduleFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssStatisticChangeScheduleFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssStatisticChangeScheduleFilterComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
