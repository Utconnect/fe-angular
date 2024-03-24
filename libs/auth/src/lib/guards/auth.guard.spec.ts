import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '@esm/cdk';
import { RedirectService } from '../services/redirect.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let mockTokenService: jasmine.SpyObj<TokenService>;
  let mockRedirectService: jasmine.SpyObj<RedirectService>;

  beforeEach(async () => {
    mockTokenService = jasmine.createSpyObj<TokenService>('TokenService', [
      'get',
    ]);
    mockRedirectService = jasmine.createSpyObj<RedirectService>(
      'RedirectService',
      ['login', 'app'],
    );

    await TestBed.configureTestingModule({
      providers: [
        RouterModule,
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
        {
          provide: RedirectService,
          useValue: mockRedirectService,
        },
      ],
    }).compileComponents();
  });

  describe('Do NOT have access token', () => {
    it('should return true if is login page', () => {
      mockTokenService.get.and.returnValue(null);

      const testUrls = ['login', 'login?redirect=example-path'];

      testUrls.forEach((url) => {
        TestBed.runInInjectionContext(() => {
          const canActive = authGuard(
            null as unknown as ActivatedRouteSnapshot,
            { url } as RouterStateSnapshot,
          );

          expect(canActive).toBeTrue();
        });
      });
    });

    it('should return false if is NOT login page', () => {
      mockTokenService.get.and.returnValue(null);

      const testUrls = ['', '/', 'data'];

      testUrls.forEach((url) => {
        TestBed.runInInjectionContext(() => {
          const canActive = authGuard(
            null as unknown as ActivatedRouteSnapshot,
            { url } as RouterStateSnapshot,
          );

          expect(canActive).toBeFalse();
          expect(mockRedirectService.login).toHaveBeenCalledWith(url);
        });
      });
    });
  });

  describe('Had access token', () => {
    it('should return true if is NOT login page', () => {
      mockTokenService.get.and.returnValue('mock-token');

      const testUrls = ['', '/', 'data'];

      testUrls.forEach((url) => {
        TestBed.runInInjectionContext(() => {
          const canActive = authGuard(
            null as unknown as ActivatedRouteSnapshot,
            { url } as RouterStateSnapshot,
          );

          expect(canActive).toBeTrue();
        });
      });
    });

    it('should return false if is login page', () => {
      mockTokenService.get.and.returnValue('mock-token');

      const testUrls = ['login', 'login?redirect=example-path'];

      testUrls.forEach(() => {
        TestBed.runInInjectionContext(() => {
          const canActive = authGuard(
            null as unknown as ActivatedRouteSnapshot,
            { url: 'login' } as RouterStateSnapshot,
          );

          expect(canActive).toBeFalse();
          expect(mockRedirectService.app).toHaveBeenCalled();
        });
      });
    });
  });
});
