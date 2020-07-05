import { TestBed } from '@angular/core/testing';

import { RelationService } from './relation.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('RelationService', () => {
  let service: RelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(RelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
