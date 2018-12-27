import { LocalStorageService } from './local-storage.service';
import { Injectable } from "@angular/core";
import { User } from "../_models/user";
import { Constants } from './constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class SharedService {
  constructor(private localStorageService: LocalStorageService) {}

  private user: User;
  private user$ = new BehaviorSubject<any>(null);
  private changeUser(user: User){
    this.user$.next(user);
    this.user$.complete();
  }
  
  public userLatest$ = this.user$.asObservable();
  public setUser(val: any) {
    this.user = val;
    this.localStorageService.set(Constants.USER_OBJECT, val);
    this.changeUser(val);
  }
  public getUser(){
    if (this.user == null || this.user == undefined)
    {
      this.user = this.localStorageService.get(Constants.USER_OBJECT);
      if(this.user != null)
        this.changeUser(this.user);
    }
    return this.user;
  }
  
}
