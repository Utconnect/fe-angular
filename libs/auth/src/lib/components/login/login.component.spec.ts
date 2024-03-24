import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { LoginComponent, NGRX, TAIGA_UI } from './login.component';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, NGRX, TAIGA_UI],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should be init', () => {
      const form = component.form;
      expect(form.value).toEqual({
        userName: '',
        password: '',
        validator: '',
      });

      for (const control in form.controls) {
        if (control !== 'validator') {
          expect(
            form.controls[control as keyof typeof form.controls].hasValidator(
              Validators.required
            )
          ).toEqual(true);
        }
      }
    });
  });

  describe('status$', () => {
    it('[No error] Form error should be null', fakeAsync(() => {
      for (const status of ['idle', 'loading', 'success'] as const) {
        component['store'].patchState({ status });
        component.status$.subscribe(() => {
          expect(component.form.errors).toBeNull();
        });
      }
    }));

    it('[Error] Form error should be set', fakeAsync(() => {
      component['store'].patchState({ status: 'error' });
      component.status$.subscribe(() => {
        expect(component.form.errors).not.toBeNull();
      });
    }));
  });

  describe('ngOnInit', () => {
    it('handleStatusChange should be called', () => {
      const spy = spyOn<any>(component, 'handleStatusChange');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('[Invalid form] should not login', () => {
      const spy = spyOn(component['store'], 'login');
      component.login();
      expect(spy).not.toHaveBeenCalled();
    });

    it('[Valid form] should login when form is valid', () => {
      component.form.patchValue({
        userName: 'userName',
        password: 'example-password',
      });
      const spy = spyOn(component['store'], 'login');
      component.login();
      expect(spy).toHaveBeenCalled();
    });
  });
});
