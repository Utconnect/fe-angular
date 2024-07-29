import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingDialogRequestChangeIntendComponent } from './teaching-dialog-request-change-intend.component';

describe('TeachingDialogRequestChangeIntendComponent', () => {
  let component: TssTeachingDialogRequestChangeIntendComponent;
  let fixture: ComponentFixture<TssTeachingDialogRequestChangeIntendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingDialogRequestChangeIntendComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssTeachingDialogRequestChangeIntendComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
