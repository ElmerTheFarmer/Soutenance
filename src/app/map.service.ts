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

  // Récupère tous les markers en bdd
  getMarkers(): Observable<Mark[]> {
    return this.http.get<Mark[]>(API_URL+ "/all");
  }

  // Ajoute un marker en bdd depuis le formulaire findByCity
  addMark(request: Mark): Observable<Mark> {
    return this.http.post<Mark>(API_URL+`/add`, request);
  }

  // // Ajoute un marker en bdd depuis un click sur la map
  // createMarker(data: CustomGeoJson): Observable<CustomGeoJson> {
  //   return this.http.post<CustomGeoJson>(API_URL, data, httpOptions);
  // }

  // Supprime un marker dans la bdd
  removeMarker(id: number): Observable<Mark> {
    console.log('Delete marker with id=' +id);
    return this.http.delete<Mark>(API_URL + `/delete/${id}`);
  }
}
