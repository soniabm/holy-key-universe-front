import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Itinerary} from './models/Itinerary.model';
import {Screen} from './models/screen.model';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private itineraryUrl = environment.apiUrl + '/itinerary';
  private screenUrl = environment.apiUrl + '/screen';

  constructor(private httpClient: HttpClient) {
  }

  getItineraries(): Observable<Itinerary[]> {
    return this.httpClient.request<Itinerary[]>('GET', this.itineraryUrl, {responseType: 'json'});
  }

  getScreen(id: string): Observable<Screen> {
    return this.httpClient.request<Screen>('GET', this.screenUrl + `/${id}`, {responseType: 'json'});
  }

  getItinerary(id: string): Observable<Itinerary[]> {
    return this.httpClient.request<Itinerary[]>('GET', this.itineraryUrl + `/${id}`, {responseType: 'json'});
  }
}
