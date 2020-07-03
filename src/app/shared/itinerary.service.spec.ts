import {TestBed} from '@angular/core/testing';

import {ItineraryService} from './itinerary.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('ItineraryService', () => {
  let service: ItineraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(ItineraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
