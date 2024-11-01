import {AllowedOrganizationTypes} from '../types/allowed-organization.types';

export interface CreateMediaLinkDto {
    url: string;
    allowedOrganizationTypes: AllowedOrganizationTypes[];
}


