import { Component, OnInit } from '@angular/core'
import { Hotel } from '../hotel'
import { HotelService } from '../hotel.service'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  selectedHotel?: Hotel;
  queryString?: string

  myObs: Observable<Hotel[]>;

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.myObs = this.hotelService.getHotels();
  }

  dismissHotel() {
    delete this.selectedHotel;
  }

  onSelect(hotel: Hotel): void {
    if (this.selectedHotel === hotel) {
      delete this.selectedHotel;
    } else {
      this.selectedHotel = hotel;
    }
  }
}
