export class RoleHelper {

    public static hasPrivilege(inputPrivileges: string[], privileges: string) {
        return RoleHelper.hasRole(inputPrivileges, privileges)
    }

    public static hasAnyPrivilege(inputPrivileges: string[], ...privileges: string[]): boolean {
        return RoleHelper.hasAnyRole(inputPrivileges, ...privileges);
    }

    public static hasRole(inputRoles: string[], role: string): boolean {
        return inputRoles.includes(role);
    }

    public static hasAnyRole(inputRoles: string[], ...role: string[]): boolean {
        return role.filter(value => inputRoles.includes(value)).length != 0;
    }
}

