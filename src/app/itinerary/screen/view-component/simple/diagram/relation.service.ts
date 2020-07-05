import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Relation} from './relation.model';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelationService {
  private url = environment.apiUrl + '/unit';

  constructor(private httpClient: HttpClient) { }

  getUnitRelations(unitTitle: string): Observable<Relation[]> {
    return this.httpClient.request<Relation[]>('GET', `${this.url}/${unitTitle}/relations`, {responseType: 'json'});
  }
}
