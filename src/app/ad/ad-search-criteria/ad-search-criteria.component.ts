import { Countries, Country } from './../../_models/countries-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-search-criteria',
  templateUrl: './ad-search-criteria.component.html',
  styleUrls: ['./ad-search-criteria.component.scss']
})
export class AdSearchCriteriaComponent implements OnInit {

  selectedCountry: Country;
  countries = Countries;
  constructor() { }

  ngOnInit() {
  }

}
