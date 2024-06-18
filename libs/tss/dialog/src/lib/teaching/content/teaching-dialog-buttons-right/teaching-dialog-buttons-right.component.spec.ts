import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingDialogButtonsRightComponent } from './teaching-dialog-buttons-right.component';

describe('TeachingDialogButtonsRightComponent', () => {
  let component: TssTeachingDialogButtonsRightComponent;
  let fixture: ComponentFixture<TssTeachingDialogButtonsRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingDialogButtonsRightComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingDialogButtonsRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
