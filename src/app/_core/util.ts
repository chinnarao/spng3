import  lookup  from 'src/assets/data/lookup.json';
import countryJson from "src/assets/data/country.json";
import { KeyValueDescription } from "../_models/ad-lookup.models";

export class Util {
    
    static GetCurrencyCodesFromJson() : Array<string> {
      // tsconfig.json, setting is required : "downlevelIteration": true
      const uniques = [...new Set(countryJson.Country.map(c => c.CurrencyCode))].sort();
      //let uniques1 = Array.from(new Set(countryJson.Country.map(c => c.CurrencyCode))) ;
      return uniques;
    }

    static GetCurrencySymbolFromJson(code : string) : string {
        const country = countryJson.Country.find(function (c) { return c.CurrencyCode === code; })
        return country.CurrencySymbol;
    }
}