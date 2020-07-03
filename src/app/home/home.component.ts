import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../shared/itinerary.service';
import { Itinerary } from '../shared/models/Itinerary.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  itineraries: Itinerary[] = [];
  error = null;

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit(): void {
    this.itineraryService.getItineraries().subscribe( itineraries => {
      this.itineraries = itineraries;
    }, () => this.error = 'No se han podido cargar los itinerarios');
  }

}
