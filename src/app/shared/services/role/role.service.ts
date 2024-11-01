import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    roles: string[] = [];

    getRoles(): string[] {
        return this.roles;
    }

    setRoles(roles: string[]) {
        return this.roles = roles;
    }

    hasAnyRole(inputRoles: string[], role: string[]): boolean {
        return role.filter(value => inputRoles.includes(value)).length != 0;
    }

    // setActivatedRole(role: string) {
    //     this.activatedRole = role;
    // }
    //
    // getActivatedRole(): string {
    //     return this.activatedRole;
    // }

    // hasRole(inputRoles: string[], role: string): boolean {
    //     return inputRoles.includes(role);
    // }

    // getRoles(): string[] {
    //     return this.profileService?.getProfile()?.realm_access?.roles;
    // }


}
