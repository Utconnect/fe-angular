import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssTeachingScheduleChangeComponent } from './change.component';

describe('TssTeachingScheduleChangeComponent', () => {
  let component: TssTeachingScheduleChangeComponent;
  let fixture: ComponentFixture<TssTeachingScheduleChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleChangeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingScheduleChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
