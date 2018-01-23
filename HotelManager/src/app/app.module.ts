import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import {HotelService} from "./hotel.service";

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    HotelDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ HotelService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
