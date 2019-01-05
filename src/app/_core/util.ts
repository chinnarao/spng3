import lookup from "src/assets/data/lookup.json";
import countryJson from "src/assets/data/country.json";
import { KeyValueDescription } from "../_models/ad-lookup.models";

export class Util {
  static GetCurrencyCodesFromJson(): Array<string> {
    // tsconfig.json, setting is required : "downlevelIteration": true
    const uniques = [
      ...new Set(countryJson.Country.map(c => c.CurrencyCode))
    ].sort();
    //let uniques1 = Array.from(new Set(countryJson.Country.map(c => c.CurrencyCode))) ;
    return uniques;
  }

  static GetCurrencySymbolFromJson(code: string): string {
    const country = countryJson.Country.find(function(c) {
      return c.CurrencyCode === code;
    });
    return country.CurrencySymbol;
  }

  // 'GET' or 'POST'
  static httpCall( method: string, url: string, data: any, callback: (result: any) => any) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    xhr.setRequestHeader("Content-Type", "text/plain;charset=utf-8");//application/json
    xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization');

    if (callback) {
      xhr.onload = function() { callback(this["responseText"]); };
    }
    // if (data != null) {
    //   xhr.send(JSON.stringify(data));
    // } else 
        xhr.send();
  }

  static mycallback(data) {
    alert(data);
 }
}
