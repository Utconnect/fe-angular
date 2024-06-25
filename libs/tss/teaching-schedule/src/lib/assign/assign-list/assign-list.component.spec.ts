import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingScheduleAssignListComponent } from './assign-list.component';

describe('AssignListComponent', () => {
  let component: TssTeachingScheduleAssignListComponent;
  let fixture: ComponentFixture<TssTeachingScheduleAssignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleAssignListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingScheduleAssignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
