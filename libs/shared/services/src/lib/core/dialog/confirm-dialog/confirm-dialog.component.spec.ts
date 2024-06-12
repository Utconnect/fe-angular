import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogOptions } from '../dialog-options';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent<ConfirmDialogOptions>;
  let fixture: ComponentFixture<ConfirmDialogComponent<ConfirmDialogOptions>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent<ConfirmDialogOptions>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
