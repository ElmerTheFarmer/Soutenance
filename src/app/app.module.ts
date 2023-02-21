import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GetweatherComponent } from './getweather/getweather.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ResultsComponent } from './results/results.component';
import { FindbycityComponent } from './findbycity/findbycity.component';
import { NewplaceComponent } from './newplace/newplace.component';

@NgModule({
  declarations: [
    AppComponent,
    GetweatherComponent,
    ResultsComponent,
    FindbycityComponent,
    NewplaceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
