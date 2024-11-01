import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Page} from "../../objects/page";
import {environment} from "../../../../environments/environment";
import {RegionResponseDto} from "../../models/region-response.dto";

@Injectable({
    providedIn: 'root'
})
export class RegionService {

    constructor(private httpClient: HttpClient) {
    }

    regions(): Observable<Page<RegionResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/regions?pageIndex=1&itemsPerPage=5000`);
    }
}
