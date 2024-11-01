import {DeclarationStatus} from "../enums/declaration-status";
import {OrganizationResponseDto} from "./organization-response.dto";
import {DeclarationRequestResponseDto} from "./declaration-request-response.dto";
import {DeclarationItemResponseDto} from "./declaration-item-response.dto";
import {DeclarationType} from '../enums/declaration-type';
import {BranchResponseDto} from './branch-response.dto';

export class DeclarationResponseDto {


    constructor(
        public declarationDate?: string | Date,
        public code?: string,
        public producer?: OrganizationResponseDto,

        public id?: string, // Declaration id
        public createdAt?: string, // Created at (date-time)
        public lastModifiedAt?: string, //
        // Last modified at (date-time)
        public declarationRequest?: DeclarationRequestResponseDto, // Declaration request details
        public organization?: OrganizationResponseDto, // Organization id
        public status?: DeclarationStatus, // Status (PENDING, APPROVED, FINALIZED, OVERDUE)
        public declarationType?: DeclarationType, // Declaration type (CONSOLIDATED or DETAILED)
        public totalTons?: number, // Total tons
        public items: DeclarationItemResponseDto[] = [],
        // public branchId?: string,
        public branch?: BranchResponseDto

    ) {
    }
}




