import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { JwtInterceptor } from './jwt.interceptor';
import { Observable } from 'rxjs';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';

describe('JwtInterceptor', () => {
  let next: {
    handle: (request: HttpRequest<any>) => Observable<HttpEvent<any>>;
  };
  let mockRequest: HttpRequest<unknown>;
  let interceptor: JwtInterceptor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [
        JwtInterceptor,
        HttpClient,
        HttpTestingController,
      ],
    }).compileComponents();

    interceptor = TestBed.inject(JwtInterceptor);
    mockRequest = new HttpRequest('GET', '/test');
  });

  it('[Token misses] should not has Authorization header', () => {
    next = {
      handle: (): Observable<HttpEvent<any>> => new Observable(),
    };
    interceptor.intercept(mockRequest, next);
    expect(mockRequest.headers.get('Authorization')).toEqual(null);
  });

  it('[Token exists] should has Authorization header', fakeAsync(() => {
    let response:
      | HttpRequest<any>
      | { headers: { get: (_: string) => string } } = {
      headers: { get: () => '' },
    };
    next = {
      handle: (responseHandle): Observable<HttpEvent<any>> => {
        response = responseHandle;
        return new Observable();
      },
    };
    interceptor.intercept(mockRequest, next);

    expect(response.headers.get('Authorization')).toContain('saved token');
  }));
});
