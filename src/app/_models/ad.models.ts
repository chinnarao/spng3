import { KeyValueDescription } from './ad-lookup.models';
export class AdSearchModel {
  sortOptionsBy: string = 'NewestFirst';
  mileOptionsBy: string = 'Maximum';  // related to milesAround
  pageNumber: number = 1;
  defaultPageSize: number = 10;
  SearchResultCount: number = 0;

  categoryName: string = "";  // related to categoryOptionsBy
  countryCode: string = "";
  cityName: string = "";
  zipCode: string = "";

  minPrice: number = 0;
  maxPrice: number = 100;
  currencyCode: string = ""; // USD or INR or AUD

  conditionName: string = "Old"; //old or new
  mapAddress: string = "";
  mapLongitude: string = "";
  mapLattitude: string = "";
}

export class LatLon {
  Lat: number;
  Lon: number;
}

export class AdModel {
  adId: string;
  adTitle: string;
  adContent: string;
  adDisplayDays: number;
  userIdOrEmail: string;
  userPhoneNumber: string;
  userSocialAvatarUrl: string;
  userLoggedInSocialProviderName: string;
  addressStreet: string;
  addressCity: string;
  addressDistrictOrCounty: string;
  addressState: string;
  addressPartiesMeetingLandmarkName: string;
  addressZipCode: string;
  addressCountryCode: string;
  addressCountryName: string;
  addressLatitude: number;
  addressLongitude: number;
  itemCost: number;
  itemCostCurrencyName: string;
  itemCurrencyISO_4217: string;
  attachedAssetsInCloudCount: number;
  attachedAssetsInCloudStorageId: string;
  attachedAssetsStoredInCloudBaseFolderPath: string;
  createdDateTime: string;
  updatedDateTime: string;
  isDeleted: boolean;
  deletedDateTime: string;
  isPublished: boolean;
  lastDraftOrBeforePublishedDateTime: string;
  lastPublishedDateTime: string;
  isActive: boolean;
  lastActiveDateTime: string;
  lastInActiveDateTime: string;
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  tag5: string;
  tag6: string;
  tag7: string;
  tag8: string;
  tag9: string;
  updatedDateTimeString: string;
  category: KeyValueDescription;
  condition: KeyValueDescription;
  isBingTypeaheadShow: boolean;
  isHereTypeaheadShow: boolean;
  isMapTilerTypeaheadShow: boolean;
  isGoogleTypeaheadShow: boolean;
}
