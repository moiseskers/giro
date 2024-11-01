import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrganizationResponseDto} from "../../../shared/models/organization-response.dto";
import {Page} from "../../../shared/objects/page";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {OrganizationService} from './organization.service';
import {MatchingResponseDto} from '../../../shared/models/matching-response.dto';
import {MatchingItemResponseDto} from '../../../shared/models/matching-item-response.dto';
import {MatchingRequestDto} from '../../../shared/models/./matching-request.dto';
import {map} from 'rxjs/operators';
import {GeneralHelper} from '../../../shared/helpers/general-helper';

@Injectable({
    providedIn: 'root'
})
export class MatchingService {

    constructor(private organizationService: OrganizationService, private httpClient: HttpClient) {}

    get(): Observable<Page<MatchingResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/matches?${window.location.search.substr(1)}`);
    }

    getById(code: string,subcategoryId: string): Observable<MatchingResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/matches/code/${code}/subcategory-id/${subcategoryId}`);
    }

    getDetails(code: string,subcategoryId: string, $event?: any): Observable<Page<MatchingItemResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/matches/code/${code}/subcategory-id/${subcategoryId}/items`, {params: $event});
    }

    downloadAll() {
        return this.httpClient.get(`${environment.apiUrl}/matches/attachments/export`, { responseType: 'blob' }).pipe(map(value => GeneralHelper.downloadBlob(value)));
        // return this.httpClient.get<any>(`${environment.apiUrl}/matches/export-csv?${window.location.search.substr(1)}`);
    }

    save(model: MatchingRequestDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/matches`, model);
    }

    download(matchId: string,attachmentId: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/matches/${matchId}/attachments/${attachmentId}`);
        // return this.httpClient.get<any>(`${environment.apiUrl}/matches/code/${code}/subcategory-id/${subcategoryId}/material-id/${materialId}/export-csv`);
    }

    getProducers(search: string): Observable<Page<OrganizationResponseDto>> {
        return this.organizationService.get({
            organizationTypes: 'PRODUCER',
            status: 'ACTIVE',
            itemsPerPage: 1000,
            search: search,
        })
    }

}
