import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getweather',
  templateUrl: './getweather.component.html',
  styleUrls: ['./getweather.component.css']
})
export class GetweatherComponent {
  lat: number;
  lon: number;
  place: any;

  constructor(private http: HttpClient, private router: Router) {
    this.lat = 0;
    this.lon = 0;
  }

  // ngOnInit(): void { 
  // }

  onSubmit() {
     this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=8118ed6ee68db2debfaaa5a44c832918`)
  .subscribe(data => {
     this.router.navigate(['/results', JSON.stringify(
      {
        place: this.place,
        data
        }
     )]); 
   });
  }
}
