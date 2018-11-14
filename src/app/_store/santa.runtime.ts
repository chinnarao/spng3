import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppStorageService } from "./app-storage.service";
import { SimpleStore } from "./simple.store";
import { AdSearchModel } from "../_models/ad.models";

export interface SantaState {
	v: number;
	adSearchModel: AdSearchModel;
}

@Injectable({
	providedIn: "root"
})
export class SantaRuntime {

	private appStorage: AppStorageService;
	private appStorageKey: string;
	private store: SimpleStore<SantaState>;

	constructor( appStorage: AppStorageService ) {
		this.appStorage = appStorage;
		this.appStorageKey = "santa_runtime_storage";
		this.store = new SimpleStore( this.getInitialState() );
		this.appStorage.registerUnloadCallback( this.saveToStorage );
	}

	public getAdSearchModel() : Observable<AdSearchModel> {
		return( this.store.select("adSearchModel") );
	}

	private getInitialState() : SantaState {
		var initialState: SantaState = {
			v: 3,
			adSearchModel: null
		};
		var savedState = this.appStorage.loadData<SantaState>( this.appStorageKey );
		if ( savedState && ( savedState.v === initialState.v ) ) {
			return( savedState );
		} else {
			return( initialState );
		}
	}

	private saveToStorage = () : void => {
		this.appStorage.saveData( this.appStorageKey, this.store.getSnapshot() );
	}
}
