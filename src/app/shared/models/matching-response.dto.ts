import {MatchingType} from '../types/matching.type';
import {CategoryType} from '../types/category.type';
import {MatchingStatus} from '../types/matching-status.type';

export interface MatchingResponseDto {
    attachmentId: string;
    id: string; // ID
    createdAt: string; // Creation date
    lastModifiedAt: string; // Last modification date
    code: string; // Code
    type: MatchingType; // Type
    category: CategoryType; // Category
    complianceYear: string; // Compliance year
    matchingBeginAt?: string; // Begin date of the matching
    matchingEndAt?: string; // End date of the matching
    status: MatchingStatus; // Status
    subcategoryId: string; // Subcategory ID
    subcategory: string; // Subcategory name
    materialId: string; // Material ID
    material: string; // Material name
    qtyOrganizations?: number; // Quantity organizations
    qtyAssociations?: number; // Quantity associations
    tonsGoal?: number; // Tons goal
    tonsAcquired?: number; // Tons acquired
}





