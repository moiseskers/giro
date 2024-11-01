import {InvoiceStatus} from '../enums/invoice-status';
import {MenuItem} from 'primeng/api';
import {InvoiceItemResponseDto} from './invoice-item-response.dto';
import {OrganizationResponseDto} from './organization-response.dto';
import {DocumentRequestDto} from './document-request.dto';

export interface InvoiceResponseDto {

    createdAt: string | Date;
    code: string;

    id: string;
    issuerId: string;
    receiverId: string;
    issueDate: Date | string;
    invoiceNumber: string;
    economicActivities: string;
    address: string;
    city: string;
    currency: string;
    netValue: number;

    items: InvoiceItemResponseDto[];

    materials: string;

    document: DocumentRequestDto;

    // Not being sent
    issuer: OrganizationResponseDto;
    receiver: OrganizationResponseDto;
    retainedIVA: number;
    total: number;

    status: InvoiceStatus;

    statuses: MenuItem[];


}

