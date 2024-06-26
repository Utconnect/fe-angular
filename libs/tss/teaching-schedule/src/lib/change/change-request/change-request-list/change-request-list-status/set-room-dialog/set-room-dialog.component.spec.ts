import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingScheduleChangeRequestListStatusSetRoomDialogComponent } from './set-room-dialog.component';

describe('ChangeSetRoomDialogComponent', () => {
  let component: TssTeachingScheduleChangeRequestListStatusSetRoomDialogComponent;
  let fixture: ComponentFixture<TssTeachingScheduleChangeRequestListStatusSetRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleChangeRequestListStatusSetRoomDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingScheduleChangeRequestListStatusSetRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
