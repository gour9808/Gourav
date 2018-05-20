import { TestBed, inject } from '@angular/core/testing';

import { CatagoriesService } from './catagories.service';

describe('CatagoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatagoriesService]
    });
  });

  it('should be created', inject([CatagoriesService], (service: CatagoriesService) => {
    expect(service).toBeTruthy();
  }));
});
