import countryJson from "src/assets/data/country.json";

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

  public static scriptRegister(src: string, id : string, isSync: boolean, isDefer: boolean, apiLoaderCallbackFnName: string, callback?: () => void): void {
    if(!document.getElementById(id)){
      window[apiLoaderCallbackFnName] = callback || (() => {});
      if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = isSync;
        script.defer = isDefer;
        script.id = id;
        document.head.appendChild(script);
      }
    }
    else{
      console.log("script is already included and trying to include again?");
    }
  }
  
}
