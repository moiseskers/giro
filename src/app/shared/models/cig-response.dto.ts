import {CigStatus} from "../enums/cig-status";
import {OrganizationResponseDto} from "./organization-response.dto";
import {BranchResponseDto} from "./branch-response.dto";
import {MenuItem} from "primeng/api";


export interface CigResponseDto {
    id: string;
    code: string;
    status: CigStatus;
    industrialConsumer: OrganizationResponseDto;
    industrialConsumerBranch: BranchResponseDto;
    pickup: OrganizationResponseDto;
    pickupBranch: BranchResponseDto;
    pretreatment: OrganizationResponseDto;
    pretreatmentBranch: BranchResponseDto;
    valuer: OrganizationResponseDto;
    valuerBranch: BranchResponseDto;
    createdAt: string;
    lastModifiedAt: string;

    statuses: MenuItem[];
}




