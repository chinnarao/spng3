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
    // if(document.getElementById(id)){
    //   var head = document.getElementsByTagName("head")[0];
    //   head.parentNode.removeChild(document.getElementById(id));
    // }
    window[apiLoaderCallbackFnName] = callback || (() => {});
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = isSync;
    script.defer = isDefer;
    script.id = id;
    document.head.appendChild(script);
  }

  //https://www.google.com/maps/@35.463637,-118.789785,15z
  public static googleLatLonUrl(latitude:number, longitude:number): any {
    const url = "https://www.google.com/maps/@" + [longitude, latitude].join(",");
    return url;
  }

  //https://maps.google.com/?q=loc: 11020 Tipperary dr Bakersfield CA US
  public static googleAddressUrl(location: string): any {
    const url = encodeURI("https://maps.google.com/?q=loc:" + location);
    return url;
  }

  //http://www.javascriptkit.com/javatutors/loadjavascriptcss2.shtml
  public static removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
  }
  
}
