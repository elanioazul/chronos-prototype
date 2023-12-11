import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isTokenPresentGuard } from './is-token-present.guard';

describe('isTokenPresentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isTokenPresentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
