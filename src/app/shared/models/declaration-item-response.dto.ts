import {DeclarationItemTypeEnum} from "../enums/declaration-item-type.enum";
import {OrganizationResponseDto} from './organization-response.dto';

export class DeclarationItemResponseDto {

    constructor(
        public id?: string, // Declaration item id
        // public categoryId?: string, // Category id
        public subcategoryId?: string, // Subcategory id
        public materialId?: string, // Material id
        public declarationItemType?: DeclarationItemTypeEnum, // Item type
        public consumer?: string, // Consumer
        public tons?: number, // Tons
        public sku?: string, // Sku (is required if declarationType equals "DETAILED")
        public description?: string, // Description (is required if declarationType equals "DETAILED")
        public businessEndDate?: any, // Business end date (ISO format, is required if declarationType equals "DETAILED")
        public industrialQualification?: string, // Industrial Qualification (is required if declarationType equals "DETAILED")
        public quantity?: number,

        public material?: string,
        public category?: any,
        public subcategory?: string,

        public operationEndDate?: any,
        public complianceYear?: string | Date,

        public materialCost?: number,

        public document?: string,
        
        public pickupId?: string,
        public pickup?: OrganizationResponseDto,
        public pretreatmentId?: string,
        public pretreatment?: OrganizationResponseDto,
        public valuerId?: string,
        public valuer?: OrganizationResponseDto,

    ) {
    }
}



