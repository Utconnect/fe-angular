import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingScheduleAssignRightTitleComponent } from './assign-right-title.component';

describe('AssignRightTitleComponent', () => {
  let component: TssTeachingScheduleAssignRightTitleComponent;
  let fixture: ComponentFixture<TssTeachingScheduleAssignRightTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleAssignRightTitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssTeachingScheduleAssignRightTitleComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
