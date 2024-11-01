import {BiddingStatus} from "../enums/bidding-status.enum";
import {BiddingType} from "../enums/bidding-type.enum";
import {EvaluationStatusEnum} from '../enums/evaluation-status.enum';

export interface BiddingResponseDto {

    formLink: string;
    id: string;
    description: string;
    createdAt: string;
    biddingType: BiddingType;
    idBali: string;
    initialDate: string;
    finalLimit: number;
    finalDate: string;
    status: BiddingStatus;
    observation: string;
    regionName: string;
    cityName: string;
    routeFrequency: string;
    populationServedId: string;
    populationServed: string;
    pcEfficiency: number;
    materials: string;
    setupId: string;
    qtyApplications: number;
    canApply: boolean;
    alreadyApplied: boolean;
    evaluationStatus: EvaluationStatusEnum,
    statuses: any[];
}

