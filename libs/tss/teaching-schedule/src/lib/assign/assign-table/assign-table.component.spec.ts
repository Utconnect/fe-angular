import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingScheduleAssignTableComponent } from './assign-table.component';

describe('AssignTableComponent', () => {
  let component: TssTeachingScheduleAssignTableComponent;
  let fixture: ComponentFixture<TssTeachingScheduleAssignTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleAssignTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingScheduleAssignTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
