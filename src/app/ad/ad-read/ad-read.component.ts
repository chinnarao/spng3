import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ToastrService } from 'ngx-toastr';
import { AdService } from '../ad.service';
import { AdModel } from 'src/app/_models/ad.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-ad-read',
    templateUrl: './ad-read.component.html',
    styleUrls: ['./ad-read.component.scss'],
})
export class AdReadComponent implements OnInit {
    adId: string;
    adModel: AdModel;
    constructor(
        private activatedRoute: ActivatedRoute,
        private logger: NGXLogger,
        private toastrService: ToastrService,
        private adService: AdService
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.adId = params['id'];
            this.getAdDetails();
        });
    }

    getAdDetails(): void {
        this.adService.getAdDetail(this.adId).subscribe(
            ad => {
                this.adModel = ad;
            },
            (err: HttpErrorResponse) => {
                switch (err.status) {
                    case 400: {
                        this.toastrService.error(err.statusText);
                        break;
                    }
                    default: {
                        if (err.status !== 0) {
                            this.toastrService.error(
                                'Failed to get advertisement, My apology, Please try again when you get a chance!'
                            );
                        }
                        break;
                    }
                }
            }
        );
    }
}
