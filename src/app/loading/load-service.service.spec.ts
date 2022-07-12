import { TestBed } from '@angular/core/testing';

import { LoadServiceService } from './load-service.service';

describe('LoadServiceService', () => {
  let service: LoadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
