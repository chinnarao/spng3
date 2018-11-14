import { Constants } from 'src/app/_core/constants';
import { AdSearchModel } from "src/app/_models/ad.models";
import { combineLatest } from "rxjs";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { LocalStorageState } from "src/app/_core/local-storage.state";
import { Store } from "src/app/_core/store";

export interface AdState {
  v: number;
  adSearchModel: AdSearchModel;
}

export type ListType = "nice" | "naughty";

@Injectable({
  providedIn: "root"
})
export class AdRuntime {
  private appStorage: LocalStorageState;
  private appStorageKey: string;
  private store: Store<AdState>;

  constructor(appStorage: LocalStorageState) {
    this.appStorage = appStorage;
    this.appStorageKey = Constants.AD_LIST_SEARCH_CRIT_STORAGE_STATE;
    console.log("testing: AD_LIST_SEARCH_CRIT_STORAGE_STATE: " + this.appStorageKey);
    this.store = new Store(this.getInitialState());
    this.appStorage.registerUnloadCallback(this.saveToStorage);
  }

  private getInitialState(): AdState {
    var adSearchModel = new AdSearchModel();
    adSearchModel.minPrice = 9;
    adSearchModel.maxPrice = 99;
	adSearchModel.condition = "Old";
	adSearchModel.countryName = "";
	adSearchModel.categoryName = "";
	adSearchModel.cityName = "";
	adSearchModel.zipCode = "";
	adSearchModel.milesAround = 10;
	adSearchModel.selectedCurrency = "";

    var initialState: AdState = {
      v: 0,
      adSearchModel: adSearchModel
    };
	var savedState = this.appStorage.loadData<AdState>(this.appStorageKey);
	console.log("countryName error: " + savedState);
    if (savedState && savedState.v === initialState.v) {
		console.log("saved stated log: " + savedState);
		return savedState;
    } else {
      return initialState;
    }
  }

  public getAdSearchModel(): Observable<AdSearchModel> {
    return this.store.select("adSearchModel");
  }

  private saveToStorage = (): void => {
    this.appStorage.saveData(this.appStorageKey, this.store.getSnapshot());
  };
}
