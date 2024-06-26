import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssTeachingScheduleChangeRequestMenuComponent } from './change-request-menu.component';

describe('TssTeachingScheduleChangeRequestMenuComponent', () => {
  let component: TssTeachingScheduleChangeRequestMenuComponent;
  let fixture: ComponentFixture<TssTeachingScheduleChangeRequestMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleChangeRequestMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssTeachingScheduleChangeRequestMenuComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
