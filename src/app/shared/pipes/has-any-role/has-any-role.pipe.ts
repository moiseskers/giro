import {Pipe, PipeTransform} from '@angular/core';
import {RoleService} from "../../services/role/role.service";

@Pipe({
    name: 'hasAnyRole'
})
export class HasAnyRolePipe implements PipeTransform {

    constructor(private roleService: RoleService) {}

    transform(appHasAnyRole: string[]): boolean {
        if (!Array.isArray(appHasAnyRole)) {
            throw new Error("appHasAnyRole must be an array of roles");
        }

        const roles = this.roleService.getRoles();

        if (!roles || roles.length === 0) {
            return false;
        }

        return this.hasAnyRole(roles, appHasAnyRole);
    }

    hasAnyRole(inputRoles: string[], requiredRoles: string[]): boolean {
        return requiredRoles.some(role => inputRoles.includes(role));
    }
}
