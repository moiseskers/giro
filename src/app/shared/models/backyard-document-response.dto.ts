import {DeclarationDocumentStatusEnum} from "../enums/declaration-document-status.enum";

export interface BackyardDocumentResponseDto {
    id?: string;
    name?: string;
    cig: string,
    sender?: string,
    status?: DeclarationDocumentStatusEnum,
    file?: string;
    contentType?: string;
}

// export enum AttachmentStatus {
//     ACTIVE = 'ACTIVE',
//     PENDING = 'PENDING',
//     REFUSED = 'REFUSED',
// }
//
