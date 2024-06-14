import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssCalendarQuickInfoContentComponent } from './quick-info-content.component';

describe('QuickInfoContentComponent', () => {
  let component: TssCalendarQuickInfoContentComponent;
  let fixture: ComponentFixture<TssCalendarQuickInfoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssCalendarQuickInfoContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssCalendarQuickInfoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
