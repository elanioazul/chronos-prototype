import { TestBed } from '@angular/core/testing';

import { VisorToMapMapperService } from './visor-to-map-mapper.service';

describe('VisorToMapMapperService', () => {
  let service: VisorToMapMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisorToMapMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
