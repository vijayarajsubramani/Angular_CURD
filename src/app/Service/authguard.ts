import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, } from '@angular/router';
import { TokenStorageService } from './token';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(private _route: Router, private _token: TokenStorageService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const login = this._token.getToken();
        if (login) {
            return true
        } else {
            this._route.navigate(['/']);
            return false;
        }
    }


}