export interface InvoiceReadFileResponseDto {
    issuerId: string;
    issuerTaxIdentificationNumber: string;
    issuerName: string;
    receiverId: string;
    receiverTaxIdentificationNumber: string;
    receiverName: string;
    invoiceNumber: string;
    issueDate: string;
    economicActivities: string;
    address: string;
    city: string;
    netValue: number;
    items: Item[];
}

export interface Item {
    code: string;
    description: string;
    quantity: number;
    netValue: number;
}




