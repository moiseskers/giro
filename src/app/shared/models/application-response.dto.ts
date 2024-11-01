import {BiddingResponseDto} from "./bidding-response.dto";
import {ApplicationStatusEnum} from "../enums/application-status.enum";
import {EvaluationResponseDto} from "./evaluation-response.dto";
import {OrganizationResponseDto} from "./organization-response.dto";
import {ManagerResponseDto} from "./manager-response.dto";

export interface ApplicationResponseDto {
    id: string;
    createdAt: string;
    lastModifiedAt: string;
    code: string;
    organizationId: string;
    managerId: string;
    applicationDate: string;
    status: ApplicationStatusEnum;
    statuses: any[];
    canAppeal: boolean;
    bidding: BiddingResponseDto;
    organization: OrganizationResponseDto;
    manager: ManagerResponseDto;
    evaluations: EvaluationResponseDto[];
}





