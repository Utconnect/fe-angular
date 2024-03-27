import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { EsmDialogResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordDialogComponent', () => {
  let component: EsmDialogResetPasswordComponent;
  let fixture: ComponentFixture<EsmDialogResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [
        ESM_STORE_PROVIDER,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: { data: '' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EsmDialogResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
