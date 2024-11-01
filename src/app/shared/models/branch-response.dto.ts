import {BranchProducerType} from "../enums/branch-producer-type";
import {OrganizationResponseDto} from './organization-response.dto';

export interface BranchResponseDto {
    id: string;
    code: string;
    name: string;
    address: string;
    producerType: BranchProducerType;
    city: string;
    state: string;
    organization: OrganizationResponseDto;
}

