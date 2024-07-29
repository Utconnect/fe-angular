import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingScheduleChangeRequestPaginationComponent } from './change-request-pagination.component';

describe('ChangeRequestPaginationComponent', () => {
  let component: TssTeachingScheduleChangeRequestPaginationComponent;
  let fixture: ComponentFixture<TssTeachingScheduleChangeRequestPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingScheduleChangeRequestPaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssTeachingScheduleChangeRequestPaginationComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
