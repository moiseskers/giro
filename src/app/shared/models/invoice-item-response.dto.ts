
export class InvoiceItemResponseDto {

    constructor(
        public id?: string,
        public code?: string,
        public description?: string,
        public subcategoryId?: string,
        public materialId?: string,
        public complianceYear?: string | Date, // Format: $date-time
        public quantity?: number,

        public createdAt?: string, // Format: $date-time
        public lastModifiedAt?: string, // Format: $date-time
        public material?: string,

        public subcategory?: string,

        public netValue?: number, // Format: $float
        public taxes?: number,
        public withholdingTaxes?: number, // Format: $float
        public totalAmount?: number,

    ) {
    }
}

