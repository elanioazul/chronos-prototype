import { TestBed } from '@angular/core/testing';

import { OrsResourcesService } from './ors-resources.service';

describe('OrsResourcesService', () => {
  let service: OrsResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrsResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
