import { TestBed } from '@angular/core/testing';

import { TP5Service } from './tp-5.service';

describe('TP5Service', () => {
  let service: TP5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TP5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
