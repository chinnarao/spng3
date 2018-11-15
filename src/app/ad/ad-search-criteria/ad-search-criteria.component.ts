import { AdRuntime } from "./../ad.runtime";
import { NGXLogger } from "ngx-logger";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AdSearchModel } from "src/app/_models/ad.models";
import {
  Conditions,
  Countries,
  Categories,
  CurrencyTypes
} from "src/app/_models/_data/ad-lookup-data";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { startWith, map, share } from "rxjs/operators";
import countriesJson from "src/assets/data/country.json";
import { CurrencyType } from "src/app/_models/ad-lookup.models";

@Component({
  selector: "app-ad-search-criteria",
  templateUrl: "./ad-search-criteria.component.html",
  styleUrls: ["./ad-search-criteria.component.scss"]
})
export class AdSearchCriteriaComponent implements OnInit {
  condtions = Conditions;
  countries = Countries;
  categories = Categories;
  currencyTypes = CurrencyTypes;

  currencyControl = new FormControl();
  filteredCurrencies: Observable<CurrencyType[]>;
  adSearchModel: AdSearchModel = new AdSearchModel();

  constructor(private nGXLogger: NGXLogger, private adRuntime: AdRuntime) {
    this.adRuntime.getAdSearchModel().subscribe(m => (this.adSearchModel = m));
  }

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

  _filter(input: string): CurrencyType[] {
    if (input) {
      const filterValue = input.toLowerCase();
      return this.currencyTypes.filter(option =>
        option.value.toLowerCase().includes(filterValue)
      );
    }
    return this.currencyTypes;
  }

  init(): void {}

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
