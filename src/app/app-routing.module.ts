import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItineraryComponent} from './itinerary/itinerary.component';


const routes: Routes = [
  {path: 'itinerary/:title', component: ItineraryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
