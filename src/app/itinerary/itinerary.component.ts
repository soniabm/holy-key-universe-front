import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItineraryService} from '../shared/itinerary.service';
import {Subscription} from 'rxjs';
import {Itinerary} from '../shared/models/Itinerary.model';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.less']
})
export class ItineraryComponent implements OnInit, OnDestroy {
  ItineraryLoaded = false;
  errorMessage: string;
  itinerary: Itinerary;
  screenNumber: number;

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
      (itinerary: Itinerary) => {
        this.itinerary = itinerary;
        this.screenNumber = 0;
        this.ItineraryLoaded = true;
      },
      () => {
        this.errorMessage = 'Hubo algún problema al cargar el itinerario';
        this.ItineraryLoaded = true;
      });
  }

  nextScreen(){
    if (!this.isLastScreen()){
      this.screenNumber++;
    }
  }

  previousScreen(){
    if (!this.isFirstScreen()){
      this.screenNumber--;
    }
  }

  isFirstScreen(){
    return this.screenNumber === 0;
  }

  isLastScreen(){
    return this.screenNumber === this.itinerary.screens.length - 1;
  }

  ngOnDestroy() {
    this.itinerarySubscription.unsubscribe();
  }
}
