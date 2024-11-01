import {CategoryType} from '../types/category.type';

export interface LeadsResponseDto {
    id: CategoryType;
    name: string;
    isActive: boolean;
    seqNo: number;
    materials: LeadsMaterialResponseDto[];
}

export interface LeadsMaterialResponseDto {
    id: string;
    name: string;
    isActive: boolean;
    seqNo: number;
    subcategoryId: string;
    subcategory: {
        name: string;
        isActive: boolean;
        seqNo: number;
        materials: string[]; // Assuming materials inside subcategory are strings
    };
    // enableHomeWithoutFat: boolean;
    withoutFat: boolean;
    withFat: boolean;
    dangerous: boolean;

}
