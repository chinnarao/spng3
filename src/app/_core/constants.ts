import { HttpHeaders } from "@angular/common/http";

export const enum Constants {
  TOKEN = 'token',
}

//export const AD_LIST_SEARCH_CRIT_STORAGE_STATE1: string = "ad_l_s_c_s_s";

const enum Breakpoints { xs = 'xs', sm = 'sm', md = 'md', lg = 'lg' }
enum Direction { Up = 'UP', Down = 'DOWN', Left = 'LEFT', Right = 'RIGHT' }


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
