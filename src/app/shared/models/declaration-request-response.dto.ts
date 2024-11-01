import {MenuItem} from "primeng/api";
import {DeclarationRequestStatus} from "../enums/declaration-request-status";
import {OrganizationResponseDto} from "./organization-response.dto";
import {DeclarationRequestRecurrence} from "../enums/declaration-request-recurrence";

export interface DeclarationRequestResponseDto {
    id: string; // example: 550e8400-e29b-41d4-a716-446655440000
    recurrence: DeclarationRequestRecurrence; // example: MONTHLY
    declaredMonthYear: string; // example: 2023-06
    endDate: string; // example: 2023-07-31T00:00:00Z
    totalTons: number; // example: 150
    status: DeclarationRequestStatus; // example: ACTIVE
    code: string; // example: 0001/2024
    createdAt: string; // example: 2023-06-01T00:00:00Z
    lastModifiedAt: string;

    // status helper
    statuses: MenuItem[],

    organizations: OrganizationResponseDto[],
}



