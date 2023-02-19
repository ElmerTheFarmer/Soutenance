import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  data: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.data = JSON.parse(this.route.snapshot.paramMap.get('data')!);
  }

  // convert(toconvert: any): void {
  //   this.data.
  // }

}
