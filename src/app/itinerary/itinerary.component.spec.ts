import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItineraryComponent} from './itinerary.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('ItineraryComponent', () => {
  let component: ItineraryComponent;
  let fixture: ComponentFixture<ItineraryComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItineraryComponent],
      providers: [HttpClient, HttpHandler, {
        provide: ActivatedRoute, useValue: {
          params: of({title: 'title'})
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
