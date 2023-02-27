import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-api-evaluation';

  constructor(private router: Router) { }

  hasRoute(route: string) {
    return (this.router.url === route || this.router.url === '/findbycity' || this.router.url === '/newplace');
  }
}
