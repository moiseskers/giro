export interface GroupResponseDto {
    id: string;
    name: string;
    createdAt: string;
    description: string;
    code: string;
    documents: DocumentResponseDto[];
}

export interface DocumentResponseDto {
    id: string;
    name: string;
    description: string;
}
