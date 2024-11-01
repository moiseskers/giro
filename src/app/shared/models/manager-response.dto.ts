import {OrganizationResponseDto} from "./organization-response.dto";
import {ManagerRoleType} from '../types/manager-role.type';

export interface ManagerResponseDto {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    role?: ManagerRoleType;
    status?: string;
    responsibility?: string;
    organization?: OrganizationResponseDto;
}
