import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssTeachingScheduleAssignLeftTitleComponent } from './assign-left-title.component';

describe('TssTeachingScheduleAssignLeftTitleComponent', () => {
  let component: TssTeachingScheduleAssignLeftTitleComponent;
  let fixture: ComponentFixture<TssTeachingScheduleAssignLeftTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleAssignLeftTitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssTeachingScheduleAssignLeftTitleComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
