export interface RegionResponseDto {
    id: string;
    name: string;
    cities: CityResponseDto[];
}

export interface CityResponseDto {
    name: string;
    id: string;
}
