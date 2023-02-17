import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={47.218371}&lon={-1.553621}&appid={8118ed6ee68db2debfaaa5a44c832918}';  // URL to web api
  constructor(private http: HttpClient) { }
}
