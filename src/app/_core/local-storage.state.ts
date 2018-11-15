import { Injectable } from "@angular/core";

interface UnloadCallback {
  (service?: LocalStorageState): void;
}

@Injectable({
  providedIn: "root"
})
export class LocalStorageState {
  private unloadCallbacks: UnloadCallback[];

  constructor() {
    this.unloadCallbacks = [];
    window.addEventListener("beforeunload", this.handleUnload, false);
  }

  public loadData<T = any>(key: string): T | null {
    try {
      var value = window.localStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {}
    return null;
  }

  public registerUnloadCallback(callback: UnloadCallback): void {
    this.unloadCallbacks.push(callback);
  }

  public saveData(key: string, data: any): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {}
  }

  public removeData(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {}
  }

  public removeAndSaveData(key: string, data: any): void {
    try {
      window.localStorage.removeItem(key);
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {}
  }

  private handleUnload = (event: any): void => {
    for (var callback of this.unloadCallbacks) {
      try {
        callback(this);
      } catch (error) {
        console.groupEnd();
      }
    }
  };
}
