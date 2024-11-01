import {AllowedOrganizationTypes} from '../types/allowed-organization.types';

export interface MediaLinkResponseDto {
    createdAt: string;
    description: string;
    embeddedIframe: string;
    id: string;
    lastModifiedAt: string;
    platform: string;
    thumbnailUrl: string;
    title: string;
    uploadedAt: string | null;
    url: string
    allowedOrganizationTypes: AllowedOrganizationTypes[];
}
