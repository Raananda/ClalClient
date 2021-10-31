/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InfraServerService } from './infra-server.service';

describe('Service: InfraServer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfraServerService]
    });
  });

  it('should ...', inject([InfraServerService], (service: InfraServerService) => {
    expect(service).toBeTruthy();
  }));
});
