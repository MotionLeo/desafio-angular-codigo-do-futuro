import { TestBed } from '@angular/core/testing';

import { SairDoFormGuard } from './sair-do-form.guard';

describe('SairDoFormGuard', () => {
  let guard: SairDoFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SairDoFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
