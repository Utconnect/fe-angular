import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssTeachingScheduleChangeRequestListComponent } from './change-request-list.component';

describe('TssTeachingScheduleChangeRequestListComponent', () => {
  let component: TssTeachingScheduleChangeRequestListComponent;
  let fixture: ComponentFixture<TssTeachingScheduleChangeRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleChangeRequestListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssTeachingScheduleChangeRequestListComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
