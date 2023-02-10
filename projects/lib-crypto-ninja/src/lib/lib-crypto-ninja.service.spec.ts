import { TestBed } from '@angular/core/testing';

import { LibCryptoNinjaService } from './lib-crypto-ninja.service';

describe('LibCryptoNinjaService', () => {
  let service: LibCryptoNinjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibCryptoNinjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
