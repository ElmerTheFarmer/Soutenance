import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Position } from './position';
import { Observable } from 'rxjs';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private placesUrl = 'http://localhost:8080/api/positions';
  private countriesUrl = 'http://localhost:8080/api/countries';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient
  ) {}

  getPlaces(): Observable<Position[]> {
    return this.http.get<Position[]>(this.placesUrl);
  }

  getCountries(): Observable<Position[]> {
    return this.http.get<Position[]>(this.countriesUrl);
  }
  
  getPosByCoords(lat: number, lng: number): Observable<Position> {
    const findByCoords = `http://localhost:8080/api/position-coord/${lat}/${lng}`;
    console.log(findByCoords);
    return this.http.get<Position>(findByCoords);
  }

  getByCityCountry(city: string, country: string): Observable<Position>{
    const findCityCountry = `http://localhost:8080/api/findposition/${country}/${city}`;
    console.log(findCityCountry);
    return this.http.get<Position>(findCityCountry);
  }

  getCitiesByCountry(country: string): Observable<Position[]>{
    const findByCountry = `http://localhost:8080/api/positions-country/${country}`;
    console.log(findByCountry);
    return this.http.get<Position[]>(findByCountry);
  }

  getWeatherFromCoords(lat: number, lng: number): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=8118ed6ee68db2debfaaa5a44c832918`
    );
  }

  addTemps(request: Weather): Observable<Weather> {
    const addurl = `http://localhost:8080/temp/add-temp`;
    return this.http.post<Weather>(addurl, request);
  }

  addPos(request: Position): Observable<Position> {
    const addposurl = `http://localhost:8080/api/add-position`;
    return this.http.post<Position>(addposurl, request);
  }

}