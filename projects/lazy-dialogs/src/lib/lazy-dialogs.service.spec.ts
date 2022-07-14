import { TestBed } from '@angular/core/testing';

import { LazyDialogsService } from './lazy-dialogs.service';

describe('LazyDialogsService', () => {
  let service: LazyDialogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyDialogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
