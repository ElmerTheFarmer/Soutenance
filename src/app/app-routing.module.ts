import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GetweatherComponent } from './getweather/getweather.component';
import { ResultsComponent } from './results/results.component';
import { FindbycityComponent } from './findbycity/findbycity.component';
import { NewplaceComponent } from './newplace/newplace.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'getweather', component: GetweatherComponent },
  { path: 'results/:data', component: ResultsComponent },
  { path: 'findbycity', component: FindbycityComponent },
  { path: 'newplace', component: NewplaceComponent },
  { path: 'map', component: MapBoxComponent },
  // { path: '', redirectTo: '/getweather', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
