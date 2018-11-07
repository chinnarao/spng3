import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AdModel } from 'src/app/_models/ad.model';
import { ToastrService } from 'ngx-toastr';
import { AdService } from '../ad.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.scss']
})
export class AdCreateComponent implements OnInit {

  adModel: AdModel;
  private errors = [];
  constructor(private logger: NGXLogger, private toastrService: ToastrService, private adService: AdService) {
  }

  ngOnInit() {
    this.createAdModel();
  }

  createAd(): void {
    this.adService.createAd(this.adModel).subscribe(
        ad => {
            this.toastrService.success('Advertisement posted success, Thank you sir!');
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 400: {
              this.errors = [];
              err.error.forEach((obj, i) => {
                this.errors.push(obj);
              });
              break;
            }
            default: {
              if (err.status !== 0) {
                this.toastrService.error('Failed to post advertisement, My apology, Please try again when you get a chance!');
              }
              break;
            }
          }
        }
    );
  }

  createAdModel(): AdModel {
    if (!this.adModel) {
        this.adModel = new AdModel();
    }
    // this.adModel.adId = '636671112867386101';
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
    this.adModel.addressCountryCode = 'sl____';
    this.adModel.addressCountryName = 'sri lanka';
    this.adModel.addressLatitude = 85.98673;
    this.adModel.addressLongitude = 97.124498;
    this.adModel.itemCost = 1474.36;
    this.adModel.itemCostCurrencyName = 'dollar';
    this.adModel.itemCurrencyISO_4217 = 'USD____';
    this.adModel.attachedAssetsInCloudCount = 2;
    this.adModel.attachedAssetsInCloudStorageId = '8b8174ed-dc5d-4433-b41d-175625bd363d';
    this.adModel.attachedAssetsStoredInCloudBaseFolderPath = 'https://github.com/chinnarao';
    this.adModel.tag1 = 'do';
    this.adModel.tag2 = 'amet';
    this.adModel.tag3 = 'nulla';
    this.adModel.tag4 = 'aute';
    this.adModel.tag5 = 'sint';
    this.adModel.tag6 = 'exercitation';
    this.adModel.tag7 = 'adipisicing';
    this.adModel.tag8 = 'irure';
    this.adModel.tag9 = 'nostrud';
    return this.adModel;
  }

}
