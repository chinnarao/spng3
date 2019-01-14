export interface MapTilerModels {
    count: number;
    nextIndex: number;
    startIndex: number;
    totalResults: number;
    results?: (MapTilerModel)[] | null;
  }
  export interface MapTilerModel {
    alternative_names: string;
    boundingbox?: (number)[] | null;
    city: string;
    class: string;
    country: string;
    country_code: string;
    county: string;
    display_name: string;
    housenumbers: string;
    id: number;
    importance: number;
    lat: number;
    lon: number;
    name: string;
    name_suffix: string;
    osm_id: string;
    osm_type: string;
    place_rank: number;
    rank: number;
    state: string;
    street: string;
    type: string;
    wikidata: string;
    wikipedia: string;
  }