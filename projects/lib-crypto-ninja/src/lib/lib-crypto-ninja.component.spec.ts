import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibCryptoNinjaComponent } from './lib-crypto-ninja.component';

describe('LibCryptoNinjaComponent', () => {
  let component: LibCryptoNinjaComponent;
  let fixture: ComponentFixture<LibCryptoNinjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibCryptoNinjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibCryptoNinjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
