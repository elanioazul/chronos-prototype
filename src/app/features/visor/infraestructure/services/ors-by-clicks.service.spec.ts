import { TestBed } from '@angular/core/testing';

import { OrsByClicksService } from './ors-by-clicks.service';

describe('OrsByClicksService', () => {
  let service: OrsByClicksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrsByClicksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
