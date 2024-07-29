import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingScheduleChangeRequestComponent } from './change-request.component';

describe('ChangeRequestComponent', () => {
  let component: TssTeachingScheduleChangeRequestComponent;
  let fixture: ComponentFixture<TssTeachingScheduleChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleChangeRequestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssTeachingScheduleChangeRequestComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
