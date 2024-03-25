import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { DataResetPasswordComponent } from './reset-password.component';

describe('DataResetPasswordComponent', () => {
  let component: DataResetPasswordComponent;
  let fixture: ComponentFixture<DataResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [APP_STORE_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(DataResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
