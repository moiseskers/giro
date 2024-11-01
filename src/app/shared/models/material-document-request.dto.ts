import {AllowedOrganizationTypes} from '../types/allowed-organization.types';

export interface MaterialDocumentRequestDto {
    contentType: string;
    name: string;
    file: string;
    allowedOrganizationTypes: AllowedOrganizationTypes[]
}
