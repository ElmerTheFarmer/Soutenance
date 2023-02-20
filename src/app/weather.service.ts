import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Position } from './position';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private placesUrl = 'http://localhost:8080/api/positions';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient
  ) {}

  getPlaces(): Observable<Position[]> {
    return this.http.get<Position[]>(this.placesUrl);
  }
  
}
