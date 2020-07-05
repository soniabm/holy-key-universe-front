import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {ItineraryService} from '../../shared/itinerary.service';
import {Screen} from '../../shared/models/screen.model';
import {ViewComponentUtils} from './view.component.utils';
import {ViewComponent} from './view.component.model';

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
  screenComponent: ViewComponent;

  constructor(private itineraryService: ItineraryService) {
  }

  ngOnInit(): void {
    this.loadScreen();
  }

  loadScreen(): void {
    this.itineraryService.getScreen(this.idScreen).subscribe(screen => {
      this.screen = screen;
      this.initScreenComponent();
      this.screenLoaded = true;
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

  initScreenComponent(): void {
    const screenComponent: any = Object.assign({}, this.screen);
    delete screenComponent.title;
    this.screenComponent = screenComponent;
  }

  isScreenComposite(): boolean {
    return ViewComponentUtils.isComposite(this.screenComponent);
  }

}
