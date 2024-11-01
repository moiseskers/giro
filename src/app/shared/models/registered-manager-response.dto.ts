import {RegisteredManagerEvaluationStatus} from "../enums/registered-manager-evaluation-status.enum";
import {ManagerResponseDto} from "./manager-response.dto";
import {OrganizationResponseDto} from "./organization-response.dto";

export interface RegisteredManagerResponseDto {
    id: string;
    createdAt: string; // Should be a date-time string
    lastModifiedAt: string; // Should be a date-time string
    code: string;
    organizationId: string;
    organization: OrganizationResponseDto;
    managerId: string;
    manager: ManagerResponseDto;
    applicationDate: string; // Should be a date-time string
    bidding: any; // Define the structure of the bidding object if known
    status: RegisteredManagerEvaluationStatus; // PENDING_EVALUATION APPROVED REJECTED
}

