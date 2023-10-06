import { TestBed } from '@angular/core/testing';

import { NetServerService } from './net-server.service';

describe('NetServerService', () => {
  let service: NetServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
