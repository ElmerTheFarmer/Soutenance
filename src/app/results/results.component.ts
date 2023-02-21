import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  data: any;
  pos: any;
  obj : any;
  time : any;
  added : Boolean = false;
  picture : any;

  constructor(
    private weatherService : WeatherService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.getData();
    this.added = false;
  }

  getData(): void {
    this.obj = JSON.parse(this.route.snapshot.paramMap.get('data')!);
    console.log("bonjour !");
    console.log(this.obj);
    console.log(this.obj.data.main);
    console.log(this.obj.place);
    this.picture = this.obj.data.weather[0].icon;
    console.log(this.picture);
  }

  add(): void{
    var newtemp: Weather = {temp : parseFloat((this.obj.data.main.temp-273.15).toFixed(1)),
      feels_like: parseFloat((this.obj.data.main.feels_like-273.15).toFixed(1)),
      temp_min: parseFloat((this.obj.data.main.temp_min-273.15).toFixed(1)),
      temp_max: parseFloat((this.obj.data.main.temp_max-273.15).toFixed(1)),
      pressure: this.obj.data.main.pressure,
      humidity: this.obj.data.main.humidity,
      timestamp: new Date(Date.now()),
      position: this.obj.place,
    }
    console.log(newtemp);
    this.added = true;
    this.weatherService.addTemps(newtemp).subscribe(response => console.log(response));
  }

}