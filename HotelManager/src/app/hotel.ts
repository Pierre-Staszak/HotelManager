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
