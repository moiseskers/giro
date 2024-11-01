import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {RoleService} from '../../shared/services/role/role.service';
import {JwtService} from '../../shared/services/auth/jwt.service';
import {Role} from '../../shared/enums/role';

export const AdminAuthGuard: CanActivateFn = async (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const roleService = inject(RoleService);
    const router = inject(Router);
    const jwt = inject(JwtService);
    const token = await jwt.getToken();
    const tokenObject = jwt.getDecodedAccessToken(token);
    const roles = tokenObject.realm_access.roles;

    if (roleService.hasAnyRole(roles, [
        Role.ADMIN,
        Role.ADMIN_BIDDING,
        Role.ADMIN_DOMICILIARY,
        Role.ADMIN_NON_DOMICILIARY,
        Role.ADMIN_PRODUCER,
    ])) {
        return true;
    } else {
        await router.navigate(['/private/process-profile']);
        return false;
    }

};
