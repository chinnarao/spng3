import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AdService } from '../ad.service';
import { AdModel } from 'src/app/_models/ad.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-ad-list',
    templateUrl: './ad-list.component.html',
    styleUrls: ['./ad-list.component.scss'],
})
export class AdListComponent implements OnInit {
    ads: AdModel[];
    data: any;
    oldData: any;
    adModel: AdModel;

    constructor(
        private logger: NGXLogger,
        private toastrService: ToastrService,
        private adService: AdService,
        private http1: HttpClient
    ) {}

    ngOnInit() {
        this.getAllAds();
    }

    getAllAds(): void {
        this.adService.getAllAds().subscribe(
            ads => {
                this.ads = ads;
            },
            (err: HttpErrorResponse) => {
                switch (err.status) {
                    case 400: {
                        this.toastrService.error('400');
                        break;
                    }
                    default: {
                        if (err.status !== 0) {
                            this.toastrService.error(
                                'Failed to get advertisements, My apology, Please try again when you get a chance!'
                            );
                        }
                        break;
                    }
                }
            }
        );
    }

    getAllUniqueTags(): void {
        this.adService.getAllUniqueTags().subscribe(
            ad => {
                this.data = ad;
            },
            error => {
                console.log('please check where i am4?');
            }
        );
    }

    updateAd(): void {
        this.adService.updateAd(undefined).subscribe(
            ad => {
                this.data = ad;
            },
            error => {
                console.log('please check where i am5?');
            }
        );
    }

    searchAds(): void {
        this.adService.updateAd(undefined).subscribe(
            ad => {
                this.data = ad;
            },
            error => {
                console.log('please check where i am6?');
            }
        );
    }

    createAdModel(): AdModel {
        if (!this.adModel) {
            this.adModel = new AdModel();
        }
        this.adModel.adId = '636671112867386101';
        this.adModel.adTitle = 'Ad 1';
        this.adModel.adContent =
            'Minim ex sint quis non officia quis excepteur. Nulla ex laborum veniam ex sint eathis.adModel.ad anim aliqua culpa reprehenderit et commodo cupidatat. Duis ea ea velit id aliquip sint laborum. Laboris do id elit dolore et sit consequat consequat exercitation dolor deserunt. Mollit mollit laboris aliquip fugiat sunt est amet fugiatthis.adModel.ad qui.';
        this.adModel.adDisplayDays = 30;
        this.adModel.userIdOrEmail = 'ad1email@live.com';
        this.adModel.userPhoneNumber = '+18104253869';
        this.adModel.userSocialAvatarUrl = 'http://placehold.it/200x200';
        this.adModel.userLoggedInSocialProviderName = 'google';
        this.adModel.addressStreet = '530 Hinsdale Street';
        this.adModel.addressCity = 'Whitewater';
        this.adModel.addressDistrictOrCounty = 'anonymous';
        this.adModel.addressState = 'Northern Mariana Islands';
        this.adModel.addressPartiesMeetingLandmarkName = 'Matthews Mcneil';
        this.adModel.addressZipCode = '45785-5785';
        this.adModel.addressCountryCode = 'sl';
        this.adModel.addressCountryName = 'sri lanka';
        this.adModel.addressLatitude = 85.98673;
        this.adModel.addressLongitude = 97.124498;
        this.adModel.itemCost = 1474.36;
        this.adModel.itemCostCurrencyName = 'dollar';
        this.adModel.itemCurrencyISO_4217 = 'USD';
        this.adModel.attachedAssetsInCloudCount = 2;
        this.adModel.attachedAssetsInCloudStorageId = '8b8174ed-dc5d-4433-b41d-175625bd363d';
        this.adModel.attachedAssetsStoredInCloudBaseFolderPath = 'https://github.com/chinnarao';
        // this.adModel.createdDateTime = '2018-10-22T06=06=52+00=00';
        // this.adModel.updatedDateTime = '2018-10-22T06=06=52+00=00';
        // this.adModel.isDeleted = true;
        // this.adModel.deletedDateTime = '';
        // this.adModel.isPublished = false;
        // this.adModel.lastDraftOrBeforePublishedDateTime = '2018-10-22T06=06=52+00=00';
        // this.adModel.lastPublishedDateTime = '2018-10-22T06=06=52+00=00';
        // this.adModel.isActive = true;
        // this.adModel.lastActiveDateTime = '';
        // this.adModel.lastInActiveDateTime = '';
        this.adModel.tag1 = 'do';
        this.adModel.tag2 = 'amet';
        this.adModel.tag3 = 'nulla';
        this.adModel.tag4 = 'aute';
        this.adModel.tag5 = 'sint';
        this.adModel.tag6 = 'exercitation';
        this.adModel.tag7 = 'adipisicing';
        this.adModel.tag8 = 'irure';
        this.adModel.tag9 = 'nostrud';
        // this.adModel.updatedDateTimeString = '2018-10-22T06=06=52+00=00';
        return this.adModel;
    }

    // testGetMethod() {
    //     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    //     this.http1.get('https://localhost:44394/api/ad/getallads').subscribe(
    //         res => {
    //             console.log(res);
    //         },
    //         err => {
    //             console.log('12333333333');
    //             console.log(err);
    //         }
    //     );
    // }
}
