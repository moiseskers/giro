import {Component} from '@angular/core';
import {ProfileService} from "../../../../shared/services/auth/profile.service";
import {RoleService} from "../../../../shared/services/role/role.service";
import {Router} from "@angular/router";
import {Role} from "../../../../shared/enums/role";
import {NGXLogger} from "ngx-logger";

@Component({
    selector: 'app-process-profile',
    standalone: true,
    imports: [],
    templateUrl: './process-profile.component.html',
    styleUrl: './process-profile.component.scss'
})
export class ProcessProfileComponent {

    data: any;

    constructor(
        public router: Router,
        private log: NGXLogger,
        private profileService: ProfileService,
        private roleService: RoleService,) {
    }

    async ngOnInit() {
        if (!this.roleService.hasAnyRole(this.roleService.getRoles(), [
            Role.ADMIN,
            Role.ADMIN_BIDDING,
            Role.ADMIN_DOMICILIARY,
            Role.ADMIN_NON_DOMICILIARY,
            Role.ADMIN_PRODUCER,
        ])) {
            await this.redirectToFirstPage(this.roleService.getRoles(), this.profileService.getProfile().organizations[0]?.id);
        } else {
            await this.redirectToFirstPage(this.roleService.getRoles(), null);
        }

        this.profileService.getChangedProfile().subscribe(value => {
            // this.redirectToFirstPage(value);
        });
    }

    async redirectToFirstPage(roles: string[], organizationId: string) {

        if (this.roleService.hasAnyRole([
            Role.ADMIN,
            Role.ADMIN_BIDDING,
            Role.ADMIN_NON_DOMICILIARY,
            Role.ADMIN_PRODUCER,
        ], roles)) {
            await this.router.navigate(['/private/admin/organization/pages']);
            return;
        }

        // giro admin
        if (this.roleService.hasAnyRole([
            Role.ADMIN_DOMICILIARY,
        ], roles)) {
            await this.router.navigate(['/private/admin/stock/pages']);
            return;
        }

        // giro manager
        if (this.roleService.hasAnyRole([Role.MANAGER], roles) && organizationId) {
            await this.redirectBasedInRole(organizationId, 'manager');
            return;
        }

        // giro producer
        if (this.roleService.hasAnyRole([Role.PRODUCER], roles) && organizationId) {
            await this.redirectBasedInRole(organizationId, 'producer');
            return;
        }

        // giro industrial-consumer
        if (this.roleService.hasAnyRole([Role.INDUSTRIAL_CONSUMER], roles) && organizationId) {
            await this.redirectBasedInRole(organizationId, 'industrial-consumer');
            return;
        }

        // giro city
        if (this.roleService.hasAnyRole([Role.CITY], roles) && organizationId) {
            await this.redirectBasedInRole(organizationId, 'city');
            return;
        }

        this.log.info('unable to match any role using roles and org', roles, organizationId)

        await this.router.navigate(['/error']);
    }

    async redirectBasedInRole(organizationId: string, path: string) {
        await this.router.navigate([`/private/${path}/organization/pages/view/${organizationId}`]);
    }

}
