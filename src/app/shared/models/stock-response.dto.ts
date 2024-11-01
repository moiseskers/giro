import {LeadsResponseDto} from './leads-response.dto';

export interface StockResponseDto {
    associationCode: string,
    associationId: string,
    associationItemId: string,

    category: LeadsResponseDto,
    subcategory: LeadsResponseDto,
    material: LeadsResponseDto,
    quantity: number,
    complianceYear: string | Date,
}

