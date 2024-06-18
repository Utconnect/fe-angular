import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingDialogButtonsLeftComponent } from './teaching-dialog-buttons-left.component';

describe('TeachingDialogButtonsLeftComponent', () => {
  let component: TssTeachingDialogButtonsLeftComponent;
  let fixture: ComponentFixture<TssTeachingDialogButtonsLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingDialogButtonsLeftComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingDialogButtonsLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
