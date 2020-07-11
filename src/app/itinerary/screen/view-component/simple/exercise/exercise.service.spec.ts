import { TestBed } from '@angular/core/testing';

import { ExerciseService } from './exercise.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('ExerciseService', () => {
  let service: ExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(ExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
