import { TestBed } from '@angular/core/testing';

import { FeaturesVisibilityService } from './features-visibility.service';

describe('FeaturesVisibilityService', () => {
  let service: FeaturesVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturesVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
