export interface BiddingDocumentResponseDto {
    createdAt: string;
    documentId: string;
    groupId: string;
    id: string;
    lastModifiedAt: string;
    contentType: string;
    name: string;
    filename: string;
    document: { name: string }
}

