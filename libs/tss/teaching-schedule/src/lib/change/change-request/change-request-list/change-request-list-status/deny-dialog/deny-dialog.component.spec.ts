import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssTeachingScheduleChangeRequestListStatusDenyDialogComponent } from './deny-dialog.component';

describe('TssTeachingScheduleChangeRequestListStatusDenyDialogComponent', () => {
  let component: TssTeachingScheduleChangeRequestListStatusDenyDialogComponent;
  let fixture: ComponentFixture<TssTeachingScheduleChangeRequestListStatusDenyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TssTeachingScheduleChangeRequestListStatusDenyDialogComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssTeachingScheduleChangeRequestListStatusDenyDialogComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
