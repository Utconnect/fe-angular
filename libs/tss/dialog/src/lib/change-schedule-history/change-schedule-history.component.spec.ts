import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssChangeScheduleHistoryDialogComponent } from './change-schedule-history.component';

describe('TssChangeScheduleHistoryDialogComponent', () => {
  let component: TssChangeScheduleHistoryDialogComponent;
  let fixture: ComponentFixture<TssChangeScheduleHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssChangeScheduleHistoryDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssChangeScheduleHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
