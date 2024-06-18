import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssCalendarMobileMenuComponent } from './calendar-menu.component';

describe('CalendarMenuComponent', () => {
  let component: TssCalendarMobileMenuComponent;
  let fixture: ComponentFixture<TssCalendarMobileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssCalendarMobileMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssCalendarMobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
