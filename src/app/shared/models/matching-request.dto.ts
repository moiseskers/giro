import {MatchingType} from '../types/matching.type';

export interface MatchingRequestDto {
    type: MatchingType;
    category: string;
    complianceYear: Date | string;
}

