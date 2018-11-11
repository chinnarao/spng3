import { NGXLogger } from "ngx-logger";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AdSearchModel } from "src/app/_models/ad.models";
import {
  Conditions,
  Countries,
  Categories
} from "src/app/_models/_data/ad-lookup-data";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { startWith, map } from "rxjs/operators";
import countriesJson from 'src/assets/data/country.json';

@Component({
  selector: "app-ad-search-criteria",
  templateUrl: "./ad-search-criteria.component.html",
  styleUrls: ["./ad-search-criteria.component.scss"]
})
export class AdSearchCriteriaComponent implements OnInit {
  condtions = Conditions;
  countries = Countries;
  categories = Categories;

  currencyControl = new FormControl();
  currencies: string[] = ["USD [$]", "INR [₹]", "EUR [€]"];
  filteredCurrencies: Observable<string[]>;

  adSearchModel: AdSearchModel;

  constructor(private nGXLogger: NGXLogger) {}

  ngOnInit() {
    this._initCurrencies();
    this.init();

    //countriesJson.countries[0].countryCca2
  }

  _initCurrencies(): void {
    this.filteredCurrencies = this.currencyControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.currencies.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  init(): void {
    if (this.adSearchModel === undefined) {
      this.adSearchModel = new AdSearchModel();
    }
  }

  @Output()
  notifyToggleAdvanceSeachClick: EventEmitter<string> = new EventEmitter<
    string
  >();
  onToggleAdvancedSeachClick() {
    this.notifyToggleAdvanceSeachClick.emit("");
  }

  reset() {}

  @Output()
  notityOnUpdateSearchClick: EventEmitter<AdSearchModel> = new EventEmitter<
    AdSearchModel
  >();
  onUpdateSearchClick() {
    this.notityOnUpdateSearchClick.emit(this.adSearchModel);
  }
}
