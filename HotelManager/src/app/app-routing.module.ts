import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels/hotels.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: 'hotels', component: HotelsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
