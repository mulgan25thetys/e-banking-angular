import { TestBed } from '@angular/core/testing';

import { MoyenPaiementsService } from './moyen-paiements.service';

describe('MoyenPaiementsService', () => {
  let service: MoyenPaiementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoyenPaiementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
