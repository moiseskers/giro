import {DocumentRequestDto} from './document-request.dto';

export interface InvoiceRequestDto {

    issuerId?: string;
    receiverId?: string;
    issueDate?: Date | string;
    invoiceNumber?: string;
    economicActivities?: string;
    address?: string;
    city?: string;
    currency?: string;
    netValue?: number;

    items?: any[];

    document?: DocumentRequestDto;

    // Not being sent
    issuer?: string;
    receiver?: string;
    retainedIVA?: number;
    total?: number;

}

