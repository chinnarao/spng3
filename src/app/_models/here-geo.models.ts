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
  
  export interface HereGeo {
    suggestions: Suggestion[];
  }