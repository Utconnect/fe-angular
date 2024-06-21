import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssTeachingScheduleAssignFilterComponent } from './assign-filter.component';

describe('TssTeachingScheduleAssignFilterComponent', () => {
  let component: TssTeachingScheduleAssignFilterComponent;
  let fixture: ComponentFixture<TssTeachingScheduleAssignFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleAssignFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingScheduleAssignFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
