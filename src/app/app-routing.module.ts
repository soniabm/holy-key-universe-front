import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItineraryComponent} from './itinerary/itinerary.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'itinerary/:title', component: ItineraryComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
