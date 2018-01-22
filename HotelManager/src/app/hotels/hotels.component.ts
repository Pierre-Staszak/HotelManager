import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { Hotel} from '../hotel';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  results: string[];
  selectedHotel: Hotel;

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log(data);
      this.results = data['results'];
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/accomodations.json")
  }

  ngOnInit(): void {

  }

  onSelect(hotel: Hotel): void {
    this.selectedHotel = hotel;
  }

}
