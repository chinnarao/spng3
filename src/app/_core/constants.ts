import { HttpHeaders } from "@angular/common/http";

export const enum Constants {
  TOKEN = 'token',
  DAYS_TO_DISPLAY = 30,
  USER_OBJECT = 'user',
  FIELD_MSG_REQ = "Required",
  FIELD_MSG_MIN = "Minimum 2 charactors needed",
  FIELD_HINT_DISPLAYDAYS = "Digits only allowed (1-255)",
  FIELD_HINT_PHONECOUNTRYCODE = "Digits only allowed (1-995)",
  FIELD_HINT_PHONENUMBER = "10 Digits only allowed (1234567890)",
  FIELD_HINT_ITEMCOST = "Digits only allowed(0.99)",
  FIELD_HINT_ITEMCURRENCYCODE = "Currency Type($)"
}

//export const AD_LIST_SEARCH_CRIT_STORAGE_STATE1: string = "ad_l_s_c_s_s";

const enum Breakpoints { xs = 'xs', sm = 'sm', md = 'md', lg = 'lg' }
enum Direction { Up = 'UP', Down = 'DOWN', Left = 'LEFT', Right = 'RIGHT' }

export const enum GeoCodeReverseWithLatLonEnum { BING = 'bing', ESRI = 'esri', GOOGLE = 'google' }
export const enum GeoCodeReverseWithoutLatLonEnum { GEOIPDB = 'geoipdb' }
export const enum TypeaheadApiEnum { BING = 'bing', MAPTILER = 'maptiler', HERE = 'here', GOOGLE = 'google' }


export const Headers_Content_Type_Text: HttpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' });
export const Headers_Content_Type_Json: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }); //; charset=utf-8








































// export class AppDefinitions {
//     public static ApiBasePath: string = "http://<my webapp name>.azurewebsites.net/api/";
//     public static ApiLoginPath: string = AppDefinitions.ApiBasePath + "Login/";
//     public static ApiSmartCardAdminPath: string = AppDefinitions.ApiBasePath + "SmartCard/";
//     public static JsonHttpHeaders: HttpHeaders = new HttpHeaders().set('content-type', 'application/json');
// }

// const enum HttpHeaders{
//     Content_Type = 'Content-Type',
//     Content_Type_Value = 'text/plain'
// }
