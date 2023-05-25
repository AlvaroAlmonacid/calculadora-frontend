import { TestBed } from '@angular/core/testing';

import { CalculadoraServiceService } from './calculadora-service.service';

describe('CalculadoraServiceService', () => {
  let service: CalculadoraServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculadoraServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
