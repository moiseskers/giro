import {Injectable} from '@angular/core';
import {LocalStorageService} from "ngx-localstorage";
import {jwtDecode} from 'jwt-decode';
import {KeycloakService} from "keycloak-angular";
import {KeycloakTokenPayload} from '../../objects/keycloak-token-payload';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    private _token: string;
    public tokenPrefix = 'token';

    constructor(
        protected readonly keycloak: KeycloakService,
        private localStorageService: LocalStorageService) {
    }

    async init() {
       this._token = await  this._getToken();
    }

    async _getToken() {
        return await  this.keycloak.getToken();
    }

    async getToken(): Promise<string> {
        return await this._getToken();
    }

    public removeFromStorage(): void {
        this.localStorageService.remove(this.tokenPrefix);
    }

    public getTokenExpirationDate() {
        // try {
        //     const exp = this.getDecodedAccessToken(this.getToken()).exp;
        //     const date = new Date(0);
        //     date.setUTCSeconds(exp);
        //     return date;
        // } catch (e) {
        //     return null;
        // }
    }

    public getDecodedAccessToken(token: string): KeycloakTokenPayload {
        try {
            return jwtDecode(token);
        } catch (Error) {
            return null;
        }
    }

    public isTokenExpired(): boolean {
        return false;
        // const date = this.getTokenExpirationDate();
        // if (!date) {
        //     return false;
        // }
        // return !(date.valueOf() > new Date().valueOf());
    }

    logout(): void {
        this.removeFromStorage();
    }

}
