import * as t from 'io-ts'

// Interface Hotel pour la vue
export interface Hotel {
  id: string;
  name: string;
  description: HotelDescription;
  distance_to_city: number;
  is_available: boolean;
}

// Interface HotelDescription pour la vue (toutes les propriétés sont facultatives au regard du JSON)
export interface HotelDescription {
  picture_url: string | null;
  short_description: string | null;
  address: string | null;
  phone: string | null;
}

// Interface HotelDescriptionResponse correspond au type attendu d'une description dans le JSON
export interface HotelDescriptionResponse {
  address: string | null;
  phone: string | null;
  pictures: { url: string }[];
  short_description: string | null;
}

// Le décodeur de l'interface ci-dessus
export const HotelDescriptionResponse: t.Type<
  t.mixed,
  HotelDescriptionResponse
  > = t.interface({
    address: t.union([t.null, t.string]),
    phone: t.union([t.null, t.string]),
    pictures: t.array(t.interface({ url: t.string })),
    short_description: t.union([t.null, t.string])
  });

// Interface HotelResponse correspond au type attendu d'un hôtel dans le JSON
export interface HotelResponse {
  id: string;
  name: string;
  descriptions: HotelDescriptionResponse[];
  distance_to_city: number;
  is_available: boolean;
}

// Le décodeur de l'interface ci-dessus
export const HotelResponse: t.Type<t.mixed, HotelResponse> = t.interface({
  distance_to_city: t.number,
  descriptions: t.array(HotelDescriptionResponse),
  id: t.string,
  name: t.string,
  is_available: t.boolean
});

// interface correspondant au type attendu du JSON
export interface Response {
  results: HotelResponse[];
  // Décommente les deux lignes (interface et décodeur) pour déclencher un erreur de validation
  // coucou: boolean
}

// Décodeur du JSON
export const Response: t.Type<t.mixed, Response> = t.interface({
  results: t.array(HotelResponse),
  // Décommente les deux lignes (interface et décodeur) pour déclencher un erreur de validation
  // coucou: t.boolean
});
