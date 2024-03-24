import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and clear token', () => {
    service.save('token');
    expect(service.get()).toEqual('token');
    expect(window.localStorage.getItem('access-token')).toEqual('token');

    service.clear();
    expect(service.get()).toEqual(null);
    expect(window.localStorage.getItem('access-token')).toEqual(null);
  });
});
