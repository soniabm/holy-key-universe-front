import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exerciseUrl = environment.apiUrl + '/exercise';

  constructor(private httpClient: HttpClient) { }

  sendResponseOpenAnswer(body: any): Observable<any> {
    return this.httpClient.request<void>('POST', this.exerciseUrl, {body, responseType: 'json'});
  }
}
