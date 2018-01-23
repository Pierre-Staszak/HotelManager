import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {Hotel, HotelDescription} from "./hotel";

export const toHotelDescription = (x: any):HotelDescription => {
  console.log(x);
  const desc = x.descriptions[0];
  const picture = desc ? desc.pictures[0] : undefined;
  return { picture_url: picture ? picture.picture_url : undefined, short_description: desc.short_description, address: desc.address, phone: desc.phone }
}

export const toHotel = (x: any):Hotel => {
  return { id: x.id, name: x.name, distance_to_city: x.distance_to_city, is_available: x.is_available,
          description: toHotelDescription(x) }
}

export const filterHotel = (x: any): boolean => {
  return !!x.descriptions[0]
}

export const toHotelList = (x: Array<any>):Hotel[] => {
  return x.filter(filterHotel).map(toHotel);
}

@Injectable()
export class HotelService {

  constructor(private http: HttpClient) {
    this.getHotels().subscribe(data => {
      console.log(data);
    });
  }

  public getHotels(): Observable<Hotel[]> {
    return this.http.get("./assets/accomodations.json").map((x:any) => toHotelList(x["results"]));
  }

}
