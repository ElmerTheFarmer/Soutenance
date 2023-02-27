import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Position } from '../position';
import { Weather } from '../weather';

@Component({
  selector: 'app-newplace',
  templateUrl: './newplace.component.html',
  styleUrls: ['./newplace.component.css']
})
export class NewplaceComponent {
  ville: any;
  code: any;
  countries : Position[] = [];
  cities : Position[] = [];
  latit : any;
  longit : any;
  exists : Boolean = false;
  addedPos : Boolean = false;
  dontfind : Boolean = false;

  constructor(private http: HttpClient, private router: Router, private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.getCountries();
    this.exists = false;
    this.addedPos = false;
    this.dontfind = false;
  }

  getCountries(): void {
    this.weatherService.getCountries().subscribe({
      next: (countriesFromObservable) => {
        this.countries = countriesFromObservable;
      },
    });
  }

  getCitiesFromCountry(country : string): void {
    var pays : string = country.replace(/^\d+: /, "");
    console.log(pays)
    this.weatherService.getCitiesByCountry(pays).subscribe({
      next: (citiesFromObservable) => {
        this.cities = citiesFromObservable;
        console.log(this.cities);
        var count : number = 0;
       this.cities.forEach((element) => {
        if(this.ville.toString()==element.city.toString()){
          count = 1;
          this.exists = true;
        }
    })
    if(count==0){
      this.dontfind = true
      const searchurl = `https://api.openweathermap.org/data/2.5/weather?q=${this.ville},${this.code.iso2}&appid=8118ed6ee68db2debfaaa5a44c832918`;
      console.log(searchurl);
      this.http.get(searchurl).subscribe(data => {
      var obj = JSON.parse(JSON.stringify(data));
      var newPos : Position = {city:this.ville, city_ascii:this.ville,lat: obj.coord.lat, lng: obj.coord.lon ,country:this.code.country, iso2:this.code.iso2};
      console.log(newPos);
      this.dontfind = false;
      this.exists = false;
      this.addedPos = true;
      this.weatherService.addPos(newPos).subscribe(response => console.log("Ajout de la nouvelle position : " + response.city));
      });
      
    }
      },
    });
  }

  onSubmit(){
      this.getCitiesFromCountry(this.code.country);
  }

}
