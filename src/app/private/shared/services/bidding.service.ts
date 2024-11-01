import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {PopulationServedResponseDto} from "../../../shared/models/population-served-response.dto";
import {BiddingResponseDto} from "../../../shared/models/bidding-response.dto";
import {BiddingRequestDto} from "../../../shared/models/bidding-request.dto";
import {Page} from "../../../shared/objects/page";
import {environment} from "../../../../environments/environment";
import {ApplicationCreateDto} from "../../manager/bidding/models/application-create.dto";
import {GroupResponseDto} from "../../../shared/models/group-response.dto";
import {map} from "rxjs/operators";
import {StatusHelper} from "../../../shared/helpers/status.helper";
import {BiddingStatus} from "../../../shared/enums/bidding-status.enum";

@Injectable({
    providedIn: 'root'
})
export class BiddingService {

    constructor(private httpClient: HttpClient) {
    }

    getStatusHelper(): Observable<Page<BiddingResponseDto>> {
        return this.get().pipe(map(value => {
            value.items = value.items.map(i => {
              return this.statuses(i, true);
            });
            return value;
        }));
    }

    get(): Observable<Page<BiddingResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/biddings?${window.location.search.substr(1)}`);
    }

    statuses(biddingResponseDto: BiddingResponseDto, hasEdit: boolean) {
        biddingResponseDto.statuses = StatusHelper.bidding(BiddingStatus[biddingResponseDto.status], hasEdit);
        return biddingResponseDto;
    }

    getById(id: string): Observable<BiddingResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/biddings/${id}`);
    }

    getByIdStatusHelper(id: string): Observable<BiddingResponseDto> {
        return this.getById(id).pipe(map(value => this.statuses(value, false)));
    }

    getByIdAndOrganizationId(id: string, organizationId: string): Observable<BiddingResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/biddings/${id}`, {
            params: {
                organizationId: organizationId
            }
        });
        // return this.httpClient.get<any>(`http://localhost:3000/biddings-by-id`);
    }

    getApplicationsAttachments(): Observable<GroupResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/applications/attachments`);
        // return this.httpClient.get<any>(`http://localhost:3000/biddings-applications-attachments`);
    }

    delete(id: string): Observable<BiddingResponseDto> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/biddings${id}`);
    }

    save(model: BiddingRequestDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/biddings`, model);
    }

    saveApplication(biddingId: string, model: ApplicationCreateDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/biddings/${biddingId}/applications`, model);
        // return this.httpClient.post<any>(`https://dev.eureciclo.io/giro-biddings/biddings/${biddingId}/applications`, model);
    }

    appealApplication(organizationId: string,
                      applicationId: string,
                      model: ApplicationCreateDto): Observable<void> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/organizations/${organizationId}/applications/${applicationId}/appeal`, model);
    }

    update(id: string, model: BiddingRequestDto): Observable<void> {
        return this.httpClient.put<any>(`${environment.apiUrl}/biddings/${id}`, model);
    }

    statusAward(id: string): Observable<void> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/biddings/${id}/award`, null);
    }

    statusAbandon(id: string): Observable<void> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/biddings/${id}/abandon`, null);
    }

    statusCancel(id: string, reasonCancellation: string): Observable<void> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/biddings/${id}/cancel`, {
            reasonCancellation: reasonCancellation
        });
    }

    populationServed(): Observable<Page<PopulationServedResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/population-served`);
        // return this.httpClient.get<any>(`/population-served`);
    }

    filterOptions(): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}/biddings/filter-options`);
    }

}
