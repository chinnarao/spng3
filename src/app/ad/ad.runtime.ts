import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorageState } from "src/app/_core/local-storage.state";
import { Store } from "src/app/_core/store";
import { AdSearchModel } from "src/app/_models/ad.models";

export interface AdState {
  v: number;
  adSearchModel: AdSearchModel;
}

@Injectable({
  providedIn: "root"
})
export class AdRuntime {
  private appStorage: LocalStorageState;
  private appStorageKey: string;
  private store: Store<AdState>;

  constructor(appStorage: LocalStorageState) {
    this.appStorage = appStorage;
    this.appStorageKey = "ad_runtime_storage";
    this.store = new Store(this.getInitialState());
    this.appStorage.registerUnloadCallback(this.saveToStorage);
  }

  private getInitialState(): AdState {
    let state = this.appStorage.loadData<AdState>(this.appStorageKey);
    state = this.DefaultOrSavedState(state);
    return state;
  }

  private DefaultOrSavedState(adState: AdState): AdState {
    let version: number = 0;
    var adSearchModel = new AdSearchModel();
    if (
      adState &&
      adState.adSearchModel != null &&
      adState.adSearchModel != undefined
    ) {
      adSearchModel.countryCode = adState.adSearchModel.countryCode;
      adSearchModel.cityName = adState.adSearchModel.cityName;
      adSearchModel.zipCode = adState.adSearchModel.zipCode;
      adSearchModel.mileOptionsBy = adState.adSearchModel.mileOptionsBy;
      adSearchModel.categoryName = adState.adSearchModel.categoryName;
      adSearchModel.minPrice = adState.adSearchModel.minPrice;
      adSearchModel.maxPrice = adState.adSearchModel.maxPrice;
      adSearchModel.currencyCode = adState.adSearchModel.currencyCode;
      adSearchModel.conditionName = adState.adSearchModel.conditionName;
      version = adState.v;
    }
    var initialState: AdState = {
      v: version,
      adSearchModel: adSearchModel
    };
    return initialState;
  }

  public getAdSearchModel(): Observable<AdSearchModel> {
    return this.store.select("adSearchModel");
  }

  private saveToStorage = (): void => {
    this.appStorage.removeAndSaveData(this.appStorageKey, this.store.getSnapshot());
  };
}
