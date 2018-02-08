import { Hotel } from './hotel'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'HotelFilterPipe',
})
export class HotelFilterPipe implements PipeTransform {
  transform(value: Hotel[], input: string) {
    if (input) {
      input = input.toLowerCase();
      return value.filter((hotel) =>
        hotel.name.toLowerCase().indexOf(input) > -1
      )
    }
    return value;
  }
}
