import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { User } from 'src/app/_models/user';
import { HeaderRouteHelperService } from '../header-route-helper.service';
import { LocalStorageService } from 'src/app/_core/local-storage.service';
import { Constants } from 'src/app/_core/constants';
import { SharedService } from 'src/app/_core/shared.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    isLoggedIn = false;
    user: User;
    routingService: any;
    tokenStored = false;
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private headerRouteHelperService: HeaderRouteHelperService,
        private logger: NGXLogger,
        private localStorageService: LocalStorageService,
        private sharedService: SharedService
    ) {
        this.afAuth.auth.onAuthStateChanged(user => {
            if (user) {
                this.user = new User(user);
                user.getIdToken(true).then(idToken => {
                    this.user.user_idToken = idToken;
                    // this.logger.info(this.user);
                    this.localStorageService.set(Constants.TOKEN, idToken);
                    this.tokenStored = true;
                    this.sharedService.setUser(this.user);
                });
                const route_2 = this.headerRouteHelperService.getRouteHistoryUrls_2();
                // warning: fix: Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'
                // history: 1. fixed 2. cause issue 3. commented
                // this.ngZone.run(() => this.router.navigate([route_2]));
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        });
    }

    signOut() {
        this.afAuth.auth.signOut();
        this.isLoggedIn = false;
        this.user = undefined;
        const route_1 = this.headerRouteHelperService.getRouteHistoryUrls_1();
        this.router.navigate([route_1]);
        this.localStorageService.remove(Constants.TOKEN);
        this.sharedService.setUser(null);
        this.tokenStored = false;
    }

    ngOnInit() {}
}
