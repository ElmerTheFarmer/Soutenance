import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';
import { MapService } from '../map.service';
import { Mark } from '../mark';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  data: any;
  pos: any;
  obj: any;
  time: any;
  added: Boolean = false;
  picture: any;

  constructor(
    private weatherService: WeatherService,
    private mapService: MapService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData();
    this.added = false;
  }

  getData(): void {
    this.obj = JSON.parse(this.route.snapshot.paramMap.get('data')!);
    console.log(this.obj);
    console.log(this.obj.data.main);
    console.log(this.obj.place);
    this.picture = this.obj.data.weather[0].icon;
    console.log(this.picture);
  }

  add(): void {
    // AJOUT D UNE TEMPERATURE EN BDD ASSOCIEE A UNE POSITION
    var newtemp: Weather = {
      temp: parseFloat((this.obj.data.main.temp - 273.15).toFixed(1)),
      feels_like: parseFloat((this.obj.data.main.feels_like - 273.15).toFixed(1)),
      temp_min: parseFloat((this.obj.data.main.temp_min - 273.15).toFixed(1)),
      temp_max: parseFloat((this.obj.data.main.temp_max - 273.15).toFixed(1)),
      pressure: this.obj.data.main.pressure,
      humidity: this.obj.data.main.humidity,
      timestamp: new Date(Date.now()),
      position: this.obj.place,
    }
    console.log(newtemp);
    this.added = true;
    this.weatherService.addTemps(newtemp).subscribe(response => console.log(response));

    // AJOUT D UN MARQUEUR DANS LA BDD
    var newMark: Mark = {
      temp: newtemp.temp,
      lng: newtemp.position.lng,
      lat: newtemp.position.lat,
      picture: this.picture,
      country: this.obj.place.country,
      city_ascii: this.obj.place.city_ascii
    }
    this.mapService.addMark(newMark).subscribe(response => console.log(response))
  }

}
