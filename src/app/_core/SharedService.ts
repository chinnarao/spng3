import { Injectable } from "@angular/core";
import { User } from "../_models/user";

@Injectable({
  providedIn: "root"
})
export class SharedService {
  constructor() {}
  user: User;
}
