export interface CreateDeclarationRequestRequestDto {
    recurrence?: string;
    declaredMonthYear: string | Date;
    endDate: string | Date;
    organizations: CreateDeclarationOrganizationRequestRequestDto[]
}

export interface CreateDeclarationOrganizationRequestRequestDto {
    id: string;
    branchId?: string;
}



