import {DocumentRequestDto} from "../../../../shared/models/document-request.dto";

export interface ApplicationCreateDto {
    organizationId: string;
    documents: DocumentRequestDto[];
}
