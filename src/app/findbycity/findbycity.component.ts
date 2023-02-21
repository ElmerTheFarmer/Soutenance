import { Component } from '@angular/core';
import { Position } from '../position';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-findbycity',
  templateUrl: './findbycity.component.html',
  styleUrls: ['./findbycity.component.css']
})
export class FindbycityComponent {
  place : Position
  places : Position[] = [];
  cities : Position[] = [];
  countries : Position[] = [];
  city: string;
  country: string;

  constructor(
    private weatherService: WeatherService,
    private http: HttpClient,
    private router: Router
    ){
    this.city="";
    this.country="";
    this.place = {city:"", city_ascii:"", lat:0, lng:0,country:"",iso2:""};
  }

  ngOnInit(): void {
    this.getPlaces();
    this.getCountries();
  }

  selectOption(country: string): void {
    var pays : string = country.replace(/^\d+: /, "");
    console.log(pays)
    this.weatherService.getCitiesByCountry(pays).subscribe({
      next: (citiesFromObservable) => {
        this.cities = citiesFromObservable.sort((a, b) => a.city.localeCompare(b.city));
        console.log(this.cities);
      },
    });
  }

  getPlaces(): void {
    this.weatherService.getPlaces().subscribe({
      next: (placesFromObservable) => {
        this.places = placesFromObservable;
      },
    });
  }

  getCountries(): void {
    this.weatherService.getCountries().subscribe({
      next: (countriesFromObservable) => {
        this.countries = countriesFromObservable.sort((a, b) => a.country.localeCompare(b.country));
      },
    });
  }

  getByCityCountry(): void {
    console.log(this.city);
    console.log(this.country);
    this.weatherService.getByCityCountry(this.city, this.country).subscribe(
      (placeFromObservable) => {
        this.place = placeFromObservable;
        console.log(this.place);
        this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.place.lat}&lon=${this.place.lng}&appid=8118ed6ee68db2debfaaa5a44c832918`).subscribe(data => {
          this.router.navigate(['/results', JSON.stringify(
            {
              place: this.place,
              data
              }
          )]); 
        });
      },
    );
  }


  onSubmit(){
    this.getByCityCountry();
  }
}
