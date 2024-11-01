import {BiddingStatus} from "../enums/bidding-status.enum";
import {BiddingType} from "../enums/bidding-type.enum";

export interface BiddingRequestDto {
    formLink?: string;
    id?: string;
    biddingType?: BiddingType;
    idBali?: string;
    initialDate?: string;
    finalLimit?: number;
    finalDate?: string;
    status?: BiddingStatus;
    description?: string;
    observation?: string;
    regionName?: string;
    cityName?: string;
    routeFrequency?: string;
    populationServedId?: string;
    populationServed?: string;
    pcEfficiency?: number;
    materials?: string;
}
