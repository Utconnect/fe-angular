import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssTeachingDialogComponent } from './teaching-dialog.component';

describe('TssTeachingDialogComponent', () => {
  let component: TssTeachingDialogComponent;
  let fixture: ComponentFixture<TssTeachingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
