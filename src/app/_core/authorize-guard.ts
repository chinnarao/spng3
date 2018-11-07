import { Injectable } from '@angular/core';
import {
    Router,
    Route,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivate,
    CanLoad,
    CanActivateChild,
} from '@angular/router';

@Injectable()
export class AuthorizeGuard implements CanActivate, CanLoad {
    constructor(private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.isAuthorized(route);
    }

    canLoad(route: Route): boolean {
        return this.isAuthorized(route);
    }

    private isAuthorized(route: Route | ActivatedRouteSnapshot): boolean {
        const isAuthorized = localStorage.get('token') !== 'null';

        if (!isAuthorized) {
            this._router.navigate(['/']);
        }
        return isAuthorized;
    }
}
