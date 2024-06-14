import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssCalendarQuickInfoContentEventComponent } from './quick-info-content-event.component';

describe('TssCalendarQuickInfoContentEventComponent', () => {
  let component: TssCalendarQuickInfoContentEventComponent;
  let fixture: ComponentFixture<TssCalendarQuickInfoContentEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssCalendarQuickInfoContentEventComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssCalendarQuickInfoContentEventComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
