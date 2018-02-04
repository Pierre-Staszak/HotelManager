import * as t from "io-ts";

export interface Hotel {
  id: number;
  name: string;
  description: HotelDescription;
  distance_to_city: number;
  is_available: boolean;
}

export interface HotelDescription {
  picture_url: string,
  short_description: string,
  address: string,
  phone: string
}

export const HotelDescriptionJson = t.interface({
  picture_url: t.string,
  short_description: t.string,
  address: t.string,
  phone: t.string
})

export const HotelInterface = t.interface({
  id: t.number,
  name: t.string,
  distance_to_city: t.number,
  is_available: t.boolean,
  descriptions: HotelDescriptionJson
})
