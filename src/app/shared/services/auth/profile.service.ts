import {Injectable} from '@angular/core';
import {LocalStorageService} from "ngx-localstorage";
import {JwtService} from "./jwt.service";
import {KeycloakTokenPayload} from "../../objects/keycloak-token-payload";
import {lastValueFrom, Subject} from "rxjs";
import {KeycloakService} from "keycloak-angular";
import {OrganizationService} from "../../../private/shared/services/organization.service";
import {Page} from "../../objects/page";
import {OrganizationResponseDto} from "../../models/organization-response.dto";
import {RoleService} from "../role/role.service";
import {Role} from "../../enums/role";
import {ManagerResponseDto} from '../../models/manager-response.dto';
import {GeneralHelper} from '../../helpers/general-helper';
import {HiringStatus} from '../../enums/hiring-status';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private _profilePrefix = 'profile';
    private _keycloakTokenPayload: KeycloakTokenPayload;

    private readonly _changeProfile$ = new Subject<string>;

    constructor(
        private keycloakService: KeycloakService,
        private jwtService: JwtService,
        private roleService: RoleService,
        private organizationService: OrganizationService,
        private localStorageService: LocalStorageService) {
    }

    async init() {

        // get token
        const token = await this.jwtService.getToken();

        // decode it
        this._keycloakTokenPayload = this.jwtService.getDecodedAccessToken(token);

        let roles = this._keycloakTokenPayload?.realm_access?.roles;

        if (!this.roleService.hasAnyRole([Role.ADMIN], roles)) {
            this._keycloakTokenPayload.organizations = (await this.getOrganization()).items;
        }

        await this.setProfile(this._keycloakTokenPayload);

        await this.setUpRoles(this._keycloakTokenPayload, roles);
    }

    async setUpRoles(keycloakTokenPayload: KeycloakTokenPayload, roles: string[]) {

        this.setUpRolesManager(keycloakTokenPayload, roles);

        if (!this.roleService.hasAnyRole([
            Role.ADMIN,
            Role.ADMIN_BIDDING,
            Role.ADMIN_DOMICILIARY,
            Role.ADMIN_NON_DOMICILIARY,
            Role.ADMIN_PRODUCER,
        ], roles)) {
            const organization = keycloakTokenPayload.organizations[0];

            if (GeneralHelper.isEmptyOrUndefinedOrNull(organization)) {
                throw new Error(` User with the email ${keycloakTokenPayload?.email} does not have an assigned organization`);
            }

            const managerInModel = await this.getUserFromOrganization(organization.id, keycloakTokenPayload.sub);

            if (managerInModel.role === 'MEMBER') {
                roles.push(Role.USER_MEMBER);
            }

            if (managerInModel.role === 'MODERATOR') {
                roles.push(Role.USER_MODERATOR);
            }
        }

        this.roleService.setRoles(roles);
    }

    changeProfile(role: string) {
        this._changeProfile$.next(role);
    }

    getChangedProfile(): Subject<string> {
        return this._changeProfile$;
    }

    async setProfile(keycloakTokenPayload: KeycloakTokenPayload) {
        return new Promise(resolve => {
            this._keycloakTokenPayload = keycloakTokenPayload;
            this.localStorageService.set(this._profilePrefix, this._keycloakTokenPayload);
            resolve(this._keycloakTokenPayload)
        })
    }

    getProfile(): KeycloakTokenPayload {
        return this.localStorageService.get(this._profilePrefix);
    }

    async logout() {
        this.localStorageService.remove(this._profilePrefix);
        await this.keycloakService.logout();
    }

    getOrganization(): Promise<Page<OrganizationResponseDto>> {
        return lastValueFrom(this.organizationService.getAll());
    }

    getUserFromOrganization(organizationId: string, keycloakId: string): Promise<ManagerResponseDto> {
        return lastValueFrom(this.organizationService.getUserFromOrganization(organizationId, keycloakId));
    }

    private setUpRolesManager(keycloakTokenPayload: KeycloakTokenPayload, roles: string[]) {
        if (this.roleService.hasAnyRole([Role.MANAGER], roles)) {

            const organization = keycloakTokenPayload.organizations[0];
            const managerTypes  = organization.managerTypes;

            if (HiringStatus[organization.hiringStatus] === HiringStatus.THIRD_PARTY_MANAGER) {
                roles.push(Role.MANAGER_THIRD_PARTY);
            }

            if (HiringStatus[organization.hiringStatus] === HiringStatus.NOT_HIRED) {
                roles.push(Role.MANAGER_NOT_HIRED);
            }

            if (HiringStatus[organization.hiringStatus] === HiringStatus.HIRED_BY_BIDDING) {
                roles.push(Role.MANAGER_HIRED_BY_BIDDING);
            }

            if (HiringStatus[organization.hiringStatus] === HiringStatus.HIRED_BY_DIRECT_CONTRACT) {
                roles.push(Role.MANAGER_HIRED_BY_DIRECT_CONTRACT);
            }

            if (HiringStatus[organization.hiringStatus] === HiringStatus.HIRED_BY_BIDDING_AND_DIRECT_CONTRACT) {
                roles.push(Role.MANAGER_HIRED_BY_BIDDING_AND_DIRECT_CONTRACT);
            }

            if (managerTypes.includes("PICKUP")) {
                roles.push(Role.MANAGER_PICKUP);
            }

            if (managerTypes.includes("PRETREATMENT")){
                roles.push(Role.MANAGER_PRETREATMENT);
            }

            if (managerTypes.includes("IRA_OPERATION")){
                roles.push(Role.MANAGER_IRA_OPERATION);
            }

            if (managerTypes.includes("VALUER")){
                roles.push(Role.MANAGER_VALUER);
            }
        }
    }
}
