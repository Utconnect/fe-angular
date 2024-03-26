import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { DataResetPasswordComponent } from './reset-password.component';

describe('ChangePasswordComponent', () => {
  let component: AuthChangePasswordComponent;
  let fixture: ComponentFixture<AuthChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [ESM_STORE_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
