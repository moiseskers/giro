import {OrganizationResponseDto} from './organization-response.dto';
import {DeclarationItemType} from '../types/declaration-item.type';

export interface MatchingItemResponseDto {
    associationCode: string;
    associationId: string;
    associationItemId: string;
    createdAt: string; // You could use `Date` if you plan to convert this to a Date object
    id: string;
    lastModifiedAt: string; // Same as `createdAt`, you could use `Date`
    material: string;
    materialId: string;
    organization: OrganizationResponseDto;
    subcategory: string;
    subcategoryId: string;
    tonsAcquired: number;
    tonsGoal: number;

    orderMaterial: string,
    orderMaterialType: DeclarationItemType,
    inventorySubcategory: string,
    inventoryMaterial: string,


}




