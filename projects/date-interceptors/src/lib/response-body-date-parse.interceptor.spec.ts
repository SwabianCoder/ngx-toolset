import { TestBed } from '@angular/core/testing';

import { ResponseBodyDateParseInterceptor } from './response-body-date-parse.interceptor';

describe('ResponseBodyDateParseInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ResponseBodyDateParseInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ResponseBodyDateParseInterceptor = TestBed.inject(
      ResponseBodyDateParseInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
