import {Component} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {KeycloakService} from "keycloak-angular";

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {

    readonly emailPage: string = '/auth/request-access/email';

    constructor(
        protected readonly keycloak: KeycloakService,
        private layoutService: LayoutService) {}

    get dark(): boolean {
        return this.layoutService.config.colorScheme !== 'light';
    }

    async login() {
        await this.keycloak.login({
            redirectUri: window.location.origin + ''
        });
    }

}
