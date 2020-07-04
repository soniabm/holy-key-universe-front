import {Component, Input, OnInit} from '@angular/core';

import {ItineraryService} from '../../shared/itinerary.service';
import {Screen} from '../../shared/models/screen.model';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.less']
})
export class ScreenComponent implements OnInit {
  @Input()
  idScreen: string;
  screenLoaded = false;
  errorMessage: string;
  screen: Screen;

  constructor(private itineraryService: ItineraryService) {
  }

  ngOnInit(): void {
    this.itineraryService.getScreen(this.idScreen).subscribe(screen => {
      this.screenLoaded = true;
      this.screen = screen;
    }, () => {
      this.screenLoaded = true;
      this.errorMessage = 'No se ha podido cargar la pantalla';
    });
  }

}
