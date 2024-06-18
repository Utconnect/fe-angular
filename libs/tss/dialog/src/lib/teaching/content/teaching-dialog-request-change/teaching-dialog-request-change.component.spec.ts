import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingDialogRequestChangeComponent } from './teaching-dialog-request-change.component';

describe('TeachingDialogRequestChangeComponent', () => {
  let component: TssTeachingDialogRequestChangeComponent;
  let fixture: ComponentFixture<TssTeachingDialogRequestChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingDialogRequestChangeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingDialogRequestChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
