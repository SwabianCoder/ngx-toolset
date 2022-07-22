import { TestBed } from '@angular/core/testing';
import { ApiTokenInterceptor } from './api-token.interceptor';

describe('ApiTokenInterceptor', () => {
  let service: ApiTokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTokenInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
