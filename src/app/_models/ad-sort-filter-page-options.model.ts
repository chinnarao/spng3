export interface AdSortFilterPageOptionsModel {
    orderByOptions:  number;
    filterBy:        number;
    filterValue:     string;
    pageNumber:      number;
    defaultPageSize: number;
    prevCheckState:  string;

    countryCca2   : string;
    countryName   : string;
    cityName: string;
    zipCode: string;
    milesAround: number;
    minPrice: number;
    maxPrice: number;
    condition: string; //old or new
    priceType: string;  // dollar or rupee

    mapAddress: string;
    mapLongitude: string;
    mapLattitude: string;
}
