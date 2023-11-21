import { TestBed } from '@angular/core/testing';

import { ConversasTesteService } from './conversas-teste.service';

describe('ConversasTesteService', () => {
  let service: ConversasTesteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversasTesteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
