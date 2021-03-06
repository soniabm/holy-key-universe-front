import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {FooterComponent} from './shared/footer/footer.component';
import {HomeComponent} from './home/home.component';
import {ItineraryComponent} from './itinerary/itinerary.component';
import {LoaderComponent} from './shared/loader/loader.component';
import {ScreenComponent} from './itinerary/screen/screen.component';
import {SimpleComponent} from './itinerary/screen/view-component/simple/simple.component';
import {GridComponent} from './itinerary/screen/view-component/grid/grid.component';
import {DiagramComponent} from './itinerary/screen/view-component/simple/diagram/diagram.component';
import {ExerciseComponent} from './itinerary/screen/view-component/simple/exercise/exercise.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Safe} from './itinerary/screen/view-component/simple/utils';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ItineraryComponent,
    LoaderComponent,
    ScreenComponent,
    SimpleComponent,
    GridComponent,
    DiagramComponent,
    ExerciseComponent,
    Safe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
