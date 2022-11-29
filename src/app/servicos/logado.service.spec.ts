import { TestBed } from '@angular/core/testing';

import { LogadoService } from './logado.service';

describe('LogadoService', () => {
  let service: LogadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
