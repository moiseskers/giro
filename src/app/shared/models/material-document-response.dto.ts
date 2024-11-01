import {AllowedOrganizationTypes} from '../types/allowed-organization.types';

export interface MaterialDocumentResponseDto {
    createdAt: string;
    documentId: string;
    groupId: string;
    id: string;
    lastModifiedAt: string;
    contentType: string;
    name: string;
    filename: string;
    allowedOrganizationTypes: AllowedOrganizationTypes[]
}
