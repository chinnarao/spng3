import countryJson from "src/assets/data/country.json";
import { environment } from "src/environments/environment";

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

  //https://api.github.com/search/repositories?q=a&sort=stars&order=desc
  //https://theinfogrid.com/tech/developers/angular/ng-material-autocomplete-http-lookup/
  //https://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=wiSaJwgTMCWhOmkvEXxc&app_code=6e19RoRJT_hw4Gi-8gnvHw&query=Pariser+1+Berl
  static hereGeoUrl(): string {
    const autoCompleteUrl = environment.hereGeo.autoCompleteUrl;
    const app_id = environment.hereGeo.app_id;
    const app_code = environment.hereGeo.app_code;
    let url = `${autoCompleteUrl}?app_id=${app_id}&app_code=${app_code}&query=`
    return url;
  }
  
}
