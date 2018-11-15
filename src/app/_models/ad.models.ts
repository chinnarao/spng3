export class AdSearchModel {
    orderByOptions:  number = 0;
    filterBy:        number = 0;
    filterValue:     string = '';
    pageNumber:      number = 0;
    defaultPageSize: number = 10;
    prevCheckState:  string = '';

    categoryName   : string = '';
    countryCca2   : string = '';
    countryName   : string = '';
    cityName: string = '';
    zipCode: string = '';
    milesAround: number = 10;
    minPrice: number = 9;
    maxPrice: number = 100;
    condition: string = 'Old'; //old or new
    priceType: string = '';  // dollar or rupee
    selectedCurrency: string = '';

    mapAddress: string = '';
    mapLongitude: string = '';
    mapLattitude: string = '';
}

export class AdModel {
    adId:                                      string;
    adTitle:                                   string;
    adContent:                                 string;
    adDisplayDays:                             number;
    userIdOrEmail:                             string;
    userPhoneNumber:                           string;
    userSocialAvatarUrl:                       string;
    userLoggedInSocialProviderName:            string;
    addressStreet:                             string;
    addressCity:                               string;
    addressDistrictOrCounty:                   string;
    addressState:                              string;
    addressPartiesMeetingLandmarkName:         string;
    addressZipCode:                            string;
    addressCountryCode:                        string;
    addressCountryName:                        string;
    addressLatitude:                           number;
    addressLongitude:                          number;
    itemCost:                                  number;
    itemCostCurrencyName:                      string;  //
    itemCurrencyISO_4217:                      string;  //INR
    attachedAssetsInCloudCount:                number;
    attachedAssetsInCloudStorageId:            string;
    attachedAssetsStoredInCloudBaseFolderPath: string;
    createdDateTime:                           string;
    updatedDateTime:                           string;
    isDeleted:                                 boolean;
    deletedDateTime:                           string;
    isPublished:                               boolean;
    lastDraftOrBeforePublishedDateTime:        string;
    lastPublishedDateTime:                     string;
    isActive:                                  boolean;
    lastActiveDateTime:                        string;
    lastInActiveDateTime:                      string;
    tag1:                                      string;
    tag2:                                      string;
    tag3:                                      string;
    tag4:                                      string;
    tag5:                                      string;
    tag6:                                      string;
    tag7:                                      string;
    tag8:                                      string;
    tag9:                                      string;
    updatedDateTimeString:                     string;
}

