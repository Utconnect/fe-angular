import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssCalendarQuickInfoHeaderComponent } from './quick-info-header.component';

describe('TssCalendarQuickInfoHeaderComponent', () => {
  let component: TssCalendarQuickInfoHeaderComponent;
  let fixture: ComponentFixture<TssCalendarQuickInfoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssCalendarQuickInfoHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssCalendarQuickInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
