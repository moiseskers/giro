import {OrganizationTypeEnum} from "../enums/organization-type.enum";
import {HiringStatus} from "../enums/hiring-status";
import {CategoryType} from '../types/category.type';
import {ManagerType} from '../types/manager.type';
import {PartnerType} from '../types/partner.type';

export interface OrganizationResponseDto {
    id: string;
    organizationType: OrganizationTypeEnum;
    businessName: string;
    tradeName: string;
    taxIdentificationNumber: string;
    status: "ACTIVE" | "INACTIVE" | "PENDING" | "REFUSED";
    address: string; // Organization address
    managerTypes: ManagerType[];
    bidManager: string | null;
    hiringStatus: HiringStatus;
    producerType: CategoryType;
    partnerType: PartnerType;
    sector: string | null;
    producerIsIndustrialConsumer: boolean;
    statuses: any;
    branchId: string;
}
