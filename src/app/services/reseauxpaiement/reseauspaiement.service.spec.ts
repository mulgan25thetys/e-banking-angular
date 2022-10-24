import { TestBed } from '@angular/core/testing';

import { ReseauspaiementService } from './reseauspaiement.service';

describe('ReseauspaiementService', () => {
  let service: ReseauspaiementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReseauspaiementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
