import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingDialogContentComponent } from './teaching-dialog-content.component';

describe('TeachingDialogContentComponent', () => {
  let component: TssTeachingDialogContentComponent;
  let fixture: ComponentFixture<TssTeachingDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingDialogContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
