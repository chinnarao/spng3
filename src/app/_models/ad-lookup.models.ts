export class KeyValueDescription {
  key: number;
  value: string;
  description: string;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface RootObject {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

//=======================================================
export interface Address {
  country: string;
  state: string;
  county: string;
  city: string;
  district: string;
  street: string;
  houseNumber: string;
  postalCode: string;
}

export interface Suggestion {
  label: string;
  language: string;
  countryCode: string;
  locationId: string;
  address: Address;
  matchLevel: string;
}

export interface RootObject1 {
  suggestions: Suggestion[];
}
