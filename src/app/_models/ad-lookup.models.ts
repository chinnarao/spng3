export class KeyValueDescription {
  key: number;
  value: string;
  description: string;
}


export interface Here_AutoComplete_Object_Address {
  country: string;
  state: string;
  county: string;
  city: string;
  district: string;
  street: string;
  houseNumber: string;
  postalCode: string;
}

export interface HereGeo {
  label: string;
  language: string;
  countryCode: string;
  locationId: string;
  address: Here_AutoComplete_Object_Address;
  matchLevel: string;

  country: string;
  state: string;
  county: string;
  city: string;
  district: string;
  street: string;
  houseNumber: string;
  postalCode: string;
}

export interface Item {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: Owner;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  master_branch: string;
  default_branch: string;
  score: number;
}

export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  received_events_url: string;
  type: string;
}

export declare type Items = Item[];

export interface GithubResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Items;
}
