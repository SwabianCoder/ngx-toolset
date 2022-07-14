import { TestBed } from '@angular/core/testing';

import { TemplateTypeCheckerService } from './template-type-checker.service';

describe('TemplateTypeCheckerService', () => {
  let service: TemplateTypeCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateTypeCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
