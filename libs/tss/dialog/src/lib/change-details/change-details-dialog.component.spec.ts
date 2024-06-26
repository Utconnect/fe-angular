import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssChangeDetailsDialogComponent } from './change-details-dialog.component';

describe('ChangeDetailsDialogComponent', () => {
  let component: TssChangeDetailsDialogComponent;
  let fixture: ComponentFixture<TssChangeDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssChangeDetailsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssChangeDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
