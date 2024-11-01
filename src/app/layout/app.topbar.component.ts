import {Component, ElementRef, ViewChild} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AppSidebarComponent} from './app.sidebar.component';
import {ProfileService} from "../shared/services/auth/profile.service";
import {KeycloakTokenPayload} from "../shared/objects/keycloak-token-payload";
import {Router} from "@angular/router";
import {OrganizationResponseDto} from "../shared/models/organization-response.dto";
import {Role} from "../shared/enums/role";
import {RoleService} from "../shared/services/role/role.service";
import {JwtService} from "../shared/services/auth/jwt.service";
import {NGXLogger} from "ngx-logger";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    @ViewChild('layout-sidebar-anchor') menuButton!: ElementRef;
    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    activeItem!: number;

    user: KeycloakTokenPayload;

    // {Razón social de la entidad}
    organizations: OrganizationResponseDto[];

    organizationSelected: any;

    constructor(public layoutService: LayoutService,
                private JwtService: JwtService,
                public el: ElementRef,
                private profileService: ProfileService,
                private router: Router,
                private roleService: RoleService,
                private log: NGXLogger,
                ) {
    }

    async ngOnInit() {
        this.user = this.profileService.getProfile();

        this.log.info('starting app-topbar component profiles ', this.user);


        if (!this.roleService.hasAnyRole(this.roleService.getRoles(), [Role.ADMIN])) {
            this.organizations = this.user.organizations;

            try {
                this.organizationSelected = this.organizations[0].id
            } catch (e) {
                new Error('The user\'s token does not include an organization array!')
            }
        }

    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onSidebarButtonClick() {
        this.layoutService.showSidebar();
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    async logout() {
        await this.profileService.logout()
    }

    company() {
        this.router.navigate([`/private/manager/organization/pages/view/${this.user.organizations[0].id}`])
    }

   async organizationSelectedEvent($event: any) {
       const currentUrl = `/private/manager/organization/pages/view/${$event.value}`;
       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
           this.router.navigate([currentUrl]);
       });
    }

    protected readonly Roles = Role;
}
