export interface IndustrialDeclarations {
    items: [
        {
            complianceMonth: string,
            quantity: number,
        }
    ],
    meta: {
        currentItemCount: number,
        itemsPerPage: number,
        startIndex: number,
        totalItems: number,
        pageIndex: number,
        totalPages: number,
        updatedAt: string
    }

}
