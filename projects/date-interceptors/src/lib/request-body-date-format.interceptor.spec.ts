import { TestBed } from '@angular/core/testing';

import { RequestBodyDateFormatInterceptor } from './request-body-date-format.interceptor';

describe('RequestBodyDateFormatInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [RequestBodyDateFormatInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: RequestBodyDateFormatInterceptor = TestBed.inject(
      RequestBodyDateFormatInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
