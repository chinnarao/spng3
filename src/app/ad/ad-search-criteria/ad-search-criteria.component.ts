import { AdRuntime } from "./../ad.runtime";
import { NGXLogger } from "ngx-logger";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AdSearchModel } from "src/app/_models/ad.models";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { startWith, map } from "rxjs/operators";
import countryJson from "src/assets/data/country.json";
import lookup from "src/assets/data/ad.json";

@Component({
  selector: "app-ad-search-criteria",
  templateUrl: "./ad-search-criteria.component.html",
  styleUrls: ["./ad-search-criteria.component.scss"]
})
export class AdSearchCriteriaComponent implements OnInit {
  
  currencyControl = new FormControl();
  
  condtions = lookup.conditionOptionsBy;
  mileOptionsBy = lookup.mileOptionsBy;
  countries = countryJson.country;
  categories = lookup.categoryOptionsBy;
  filteredCountries: Observable<any[]>;

  adSearchModel: AdSearchModel = new AdSearchModel();

  constructor(private nGXLogger: NGXLogger, private adRuntime: AdRuntime) {
    this.adRuntime.getAdSearchModel().subscribe(m => (this.adSearchModel = m));
  }

  ngOnInit() {
    this._initCurrencies();
    this.init();
  }

  _initCurrencies(): void {
    this.filteredCountries = this.currencyControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }
  
  _filter(input: string): any[] {
    if (input) {
      return countryJson.country.filter(option =>
        option.currencyCode.toLowerCase().includes(input.toLowerCase())
      );
    }
    return countryJson.country;
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
