import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssTeachingScheduleChangeRequestFilterComponent } from './change-request-filter.component';

describe('TssTeachingScheduleChangeRequestFilterComponent', () => {
  let component: TssTeachingScheduleChangeRequestFilterComponent;
  let fixture: ComponentFixture<TssTeachingScheduleChangeRequestFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleChangeRequestFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssTeachingScheduleChangeRequestFilterComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
