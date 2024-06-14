import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssCalendarQuickInfoContentCellComponent } from './quick-info-content-cell.component';

describe('TssCalendarQuickInfoContentCellComponent', () => {
  let component: TssCalendarQuickInfoContentCellComponent;
  let fixture: ComponentFixture<TssCalendarQuickInfoContentCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssCalendarQuickInfoContentCellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssCalendarQuickInfoContentCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
