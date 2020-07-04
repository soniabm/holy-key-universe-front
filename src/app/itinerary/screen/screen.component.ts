import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {ItineraryService} from '../../shared/itinerary.service';
import {Screen} from '../../shared/models/screen.model';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.less']
})
export class ScreenComponent implements OnInit, OnChanges {
  @Input()
  idScreen: string;
  screenLoaded = false;
  errorMessage: string;
  screen: Screen;

  constructor(private itineraryService: ItineraryService) {
  }

  ngOnInit(): void {
    this.loadScreen();
  }

  loadScreen(): void {
    this.itineraryService.getScreen(this.idScreen).subscribe(screen => {
      this.screenLoaded = true;
      this.screen = screen;
    }, () => {
      this.screenLoaded = true;
      this.errorMessage = 'No se ha podido cargar la pantalla';
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.idScreen.firstChange && changes.idScreen.currentValue !== changes.idScreen.previousValue) {
      this.loadScreen();
    }
  }

}
