import {HiringStatus} from "../enums/hiring-status";
import {CategoryTypeEnum} from "../enums/category-type.enum";
import {PartnerTypeEnum} from "../enums/partner-type.enum";
import {ManagerResponseDto} from "./manager-response.dto";
import {DocumentRequestDto} from "./document-request.dto";
import {LegalRepresentativeRequestDto} from "./legal-representative-request.dto";
import {OrganizationTypeEnum} from '../enums/organization-type.enum';
import {ManagerTypeEnum} from '../enums/manager-type.enum';

export interface OrganizationRequestDto {
    organizationType: OrganizationTypeEnum;
    businessName: string;
    tradeName?: string;
    taxIdentificationNumber: string;
    address: string;
    managerTypes?: ManagerTypeEnum[];
    bidManager: string;
    hiringStatus?: HiringStatus;
    producerType?: CategoryTypeEnum;
    partnerType?: PartnerTypeEnum;
    sector?: string;
    producerIsIndustrialConsumer?: boolean;
    documents: DocumentRequestDto[];
    managers?: ManagerResponseDto[];
    legalRepresentatives?: LegalRepresentativeRequestDto[];
}
