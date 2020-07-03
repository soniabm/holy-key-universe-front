import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItineraryService} from '../shared/itinerary.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.less']
})
export class ItineraryComponent implements OnInit, OnDestroy {
  ItineraryLoaded = false;
  errorMessage: string;

  private itinerarySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private itineraryService: ItineraryService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const itineraryId = params.title;
      this.getItinerary(itineraryId);
    });
  }

  private getItinerary(id: string) {
    this.itinerarySubscription = this.itineraryService.getItinerary(id).subscribe(
      () => {
        this.ItineraryLoaded = true;
      },
      () => {
        this.errorMessage = 'Error';
        this.ItineraryLoaded = true;
      });
  }

  ngOnDestroy() {
    this.itinerarySubscription.unsubscribe();
  }

}
