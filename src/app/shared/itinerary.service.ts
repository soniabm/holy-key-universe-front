import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Itinerary} from './models/Itinerary.model';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private url = environment.apiUrl + '/itinerary';

  constructor(private httpClient: HttpClient) {
  }

  getItineraries(): Observable<Itinerary[]> {
    return this.httpClient.request<Itinerary[]>('GET', this.url, {responseType: 'json'});
  }
}
