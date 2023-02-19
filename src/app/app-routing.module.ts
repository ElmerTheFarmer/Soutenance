import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GetweatherComponent } from './getweather/getweather.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: 'getweather', component: GetweatherComponent },
  { path: 'results/:data', component: ResultsComponent },
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
