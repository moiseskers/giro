import {FormControl} from "@angular/forms";
import {DocumentRequestDto} from '../models/document-request.dto';

export interface InvoiceRequestDtoForm {
    issuerId: FormControl<string>;
    receiverId: FormControl<string>;
    issueDate: FormControl<Date | string>;
    invoiceNumber: FormControl<string>;
    economicActivities: FormControl<string>;
    address: FormControl<string>;
    city: FormControl<string>;
    currency: FormControl<string>;
    netValue: FormControl<number>;

    items: FormControl<any>;

    document: FormControl<DocumentRequestDto>;

    // Not being sent
    issuer: FormControl<string>;
    receiver: FormControl<string>;
    iva: FormControl<number>;
    retainedIVA: FormControl<number>;
    total: FormControl<number>;
}

