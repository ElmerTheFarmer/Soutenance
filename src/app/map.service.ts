import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mark } from './mark';
import { CustomGeoJson } from './map';

// Jacques
// const API_URL = 'http://localhost:3000/markers';

const API_URL = 'http://localhost:8080/mark';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) { }

  // Méthode de Jacques
  // getMarkers(): Observable<CustomGeoJson[]> {
  //   return this.http.get<CustomGeoJson[]>(API_URL+`/all`);
  // }

  getMarkers(): Observable<Mark[]> {
    console.log('Service getMarkers() appelé');
    return this.http.get<Mark[]>(API_URL+ "/all");
  }

  addMark(request: Mark): Observable<Mark> {

    return this.http.post<Mark>(API_URL+`/add`, request);
  }

  createMarker(data: CustomGeoJson): Observable<CustomGeoJson> {
    return this.http.post<CustomGeoJson>(API_URL, data, httpOptions);
  }

  removeMarker(id: number): Observable<CustomGeoJson> {
    return this.http.delete<CustomGeoJson>(API_URL + `/${id}`);
  }
}
