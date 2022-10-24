import { TestBed } from '@angular/core/testing';

import { RemboursementService } from './remboursement.service';

describe('RemboursementService', () => {
  let service: RemboursementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemboursementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
