import { TestBed } from '@angular/core/testing';

import { CarrinhoObserverService } from './carrinho-observer.service';

describe('CarrinhoObserverService', () => {
  let service: CarrinhoObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
