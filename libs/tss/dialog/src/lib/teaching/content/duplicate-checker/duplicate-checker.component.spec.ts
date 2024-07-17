import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssTeachingDialogContentDuplicateCheckerComponent } from './duplicate-checker.component';

describe('TssTeachingDialogContentDuplicateCheckerComponent', () => {
  let component: TssTeachingDialogContentDuplicateCheckerComponent;
  let fixture: ComponentFixture<TssTeachingDialogContentDuplicateCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingDialogContentDuplicateCheckerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingDialogContentDuplicateCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
