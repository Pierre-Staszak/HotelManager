import * as t from 'io-ts'
import { failure } from 'io-ts/lib/PathReporter'
import { Hotel, HotelDescription, HotelResponse, Response } from './hotel'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'

//  Fonction réécrite avec un type forcé à HotelResponse plutôt qu'any
export const toHotelDescription = (x: HotelResponse): HotelDescription => {
  const desc = x.descriptions[0];
  const picture = desc.pictures[0];
  return {
    address: desc.address,
    phone: desc.phone,
    picture_url: picture ? picture.url : null,
    short_description: desc.short_description,
  };
};

// Pour les 3 fonctions suivantes on oblige le paramètre à être typé donc ces fonction ne peuvent plus être appelées avec n'importe quoi
export const toHotel = (x: HotelResponse): Hotel => {
  return {
    id: x.id,
    name: x.name,
    distance_to_city: x.distance_to_city,
    is_available: x.is_available,
    description: toHotelDescription(x)
  };
};

export const filterHotel = (x: HotelResponse): boolean => {
  return x.descriptions.length > 0;
};

export const toHotelList = (x: HotelResponse[]): Hotel[] => {
  return x.filter(filterHotel).map(toHotel);
};

// Juste une fonction pour logger les erreurs de validation dans la console
// Pour check un exemple de rapport d'erreur, tu peux faire un petit changement dans l'un des décodeurs de ./hotel.ts
export const report = (errors: t.ValidationError[]) =>
  console.log(failure(errors).join('\n\n--------------------------\n\n'));

@Injectable()
export class HotelService {
  constructor(private http: HttpClient) { }

  // Cette méthode doit retourner un Observable<Hotel[]>
  public getHotels(): Observable<Hotel[]> {
    // On fait d'abord le call permettant de retourner un Observable<Object>
    return this.http.get('./assets/accomodations.json')
      // Puis on map l'observable pour transformer notre Observable<Object> en Observable<Hotel[]>
      .map(response =>
        // Donc dans cette fonction il suffit de valider que notre response qui n'est qu'un Object est bien un Response
        t.validate(response, Response).fold(
          // Si ce n'est pas le cas on rapport l'erreur dans la console pour comprendre ce qui ne va pas.
          // On retourne alors [] pour satisfaire notre contrainte qui est de retourner un Hotel[] (ou Array<Hotel> qui est un alias)
          errors => {
            report(errors);
            return [];
          },
          // Si on a bien un Response alors on peut accéder de manière sûre à sa propriété results qui est bien de type HotelResponse[].
          // On peut donc appeler de manière sûre la fonction toHotelList.
          // J'ai redéfini la fonction pour contraindre le type de son paramètre qui était autrefois any
          res => toHotelList(res.results)
        )
      );
  }
}
