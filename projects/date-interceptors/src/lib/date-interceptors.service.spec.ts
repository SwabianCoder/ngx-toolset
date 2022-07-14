import { TestBed } from '@angular/core/testing';

import { DateInterceptorsService } from './date-interceptors.service';

describe('DateInterceptorsService', () => {
  let service: DateInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
