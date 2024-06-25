import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssTeachingScheduleAssignResultComponent } from './assign-result.component';

describe('TssTeachingScheduleAssignResultComponent', () => {
  let component: TssTeachingScheduleAssignResultComponent;
  let fixture: ComponentFixture<TssTeachingScheduleAssignResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleAssignResultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingScheduleAssignResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
