import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ProfileService} from "../../services/auth/profile.service";

@Component({
    templateUrl: './error.component.html',
    standalone: true,
    imports: [
        RouterLink,
        ButtonModule,
        RippleModule
    ]
})
export class ErrorComponent {

    constructor(
        private router: Router,
        private profileService: ProfileService) {
    }

    async action() {
        await this.profileService.logout()
        setTimeout(() => this.router.navigate(['/']), 1000);
    }
}
