import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingScheduleChangeRequestListStatusComponent } from './change-request-list-status.component';

describe('ChangeRequestListStatusComponent', () => {
  let component: TssTeachingScheduleChangeRequestListStatusComponent;
  let fixture: ComponentFixture<TssTeachingScheduleChangeRequestListStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleChangeRequestListStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssTeachingScheduleChangeRequestListStatusComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
