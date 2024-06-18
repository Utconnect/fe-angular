import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssTeachingDialogNavigationComponent } from './teaching-dialog-navigation.component';

describe('TeachingDialogNavigationComponent', () => {
  let component: TssTeachingDialogNavigationComponent;
  let fixture: ComponentFixture<TssTeachingDialogNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingDialogNavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssTeachingDialogNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
