import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import 'zone.js/dist/zone-patch-rxjs';
import { NGXLogger } from 'ngx-logger';
import { User } from 'src/app/_models/user';
import { MenuService } from '../menu.service';
import { LocalStorageService } from 'src/app/_core/local-storage.service';

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
        private menuService: MenuService,
        private ngZone: NgZone,
        private logger: NGXLogger,
        private localStorageService: LocalStorageService
    ) {
        this.afAuth.auth.onAuthStateChanged(user => {
            if (user) {
                this.user = new User(user);
                user.getIdToken(true).then(idToken => {
                    this.user.user_idToken = idToken;
                    // this.logger.info(this.user);
                    this.localStorageService.set(Constants.token, idToken);
                    this.tokenStored = true;
                });
                const route_2 = this.menuService.getRouteHistoryUrls_2();
                // warning: fix: Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'
                this.ngZone.run(() => this.router.navigate([route_2]));
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
        const route_1 = this.menuService.getRouteHistoryUrls_1();
        this.router.navigate([route_1]);
        this.localStorageService.remove(Constants.token);
        this.tokenStored = false;
    }

    ngOnInit() {}
}
