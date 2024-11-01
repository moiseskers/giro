import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {BiddingResponseDto} from "../../../../shared/models/bidding-response.dto";
import {ApplicationResponseDto} from "../../../../shared/models/application-response.dto";
import {Page} from "../../../../shared/objects/page";
import {environment} from "../../../../../environments/environment";
import {PopulationServedResponseDto} from "../../../../shared/models/population-served-response.dto";
import {BiddingRequestDto} from "../../../../shared/models/bidding-request.dto";
import {map} from "rxjs/operators";
import {StatusHelper} from "../../../../shared/helpers/status.helper";
import {ApplicationStatusEnum} from "../../../../shared/enums/application-status.enum";

@Injectable()
export class EvaluationService {

    constructor(private httpClient: HttpClient) {
    }

    get(): Observable<Page<BiddingResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/biddings?onlyWithApplication=true&${window.location.search.substr(1)}`);
    }

    getByBiddingIdAndApplicationIdStatusHelper(biddingId: string, applicationId: string): Observable<ApplicationResponseDto> {
        return this.getByBiddingIdAndApplicationId(biddingId, applicationId).pipe(map(value => {
            value.statuses = StatusHelper.applications(ApplicationStatusEnum[value.status]);
            return value;
        }));
    }

    // getByBiddingIdAndApplicationIdStatusHelper
    getByBiddingIdAndApplicationId(biddingId: string, applicationId: string): Observable<ApplicationResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/biddings/${biddingId}/applications/${applicationId}`);
    }

    getById(id: string): Observable<BiddingResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/biddings/${id}`);
    }

    getApplicationsStatusHelper(biddingId: string): Observable<Page<ApplicationResponseDto>> {
        return this.getApplications(biddingId).pipe(
            map(value => {
                value.items = value.items.map(i => {
                    i.statuses = StatusHelper.applications(ApplicationStatusEnum[i.status]);
                    return i;
                });
                return value;
            })
        );
    }

    getApplications(biddingId: string): Observable<Page<ApplicationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/biddings/${biddingId}/applications?${window.location.search.substr(1)}`);
    }

    delete(id: string): Observable<BiddingResponseDto> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/biddings${id}`);
    }

    save(model: BiddingRequestDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/biddings`, model);
    }

    update(id: string, model: BiddingRequestDto): Observable<void> {
        return this.httpClient.put<any>(`${environment.apiUrl}/biddings/${id}`, model);
    }

    populationServed(): Observable<Page<PopulationServedResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/population-served`);
    }

    filterOptions(): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}/biddings/filter-options`);
    }

    upload(evaluationId: string, id: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/applications/${evaluationId}/attachments`);
    }

    reject(biddingId: string, applicationId: string, description: string, allowToAppeal: boolean) {
        return this.httpClient.patch<any>(`${environment.apiUrl}/biddings/${biddingId}/applications/${applicationId}/refuse`,
            {
                refuseReason: description,
                canAppeal: allowToAppeal
            }
        );
    }

    approve(biddingId: string, applicationId: string,) {
        return this.httpClient.patch<any>(`${environment.apiUrl}/biddings/${biddingId}/applications/${applicationId}/approve`, null);
    }

    pending(biddingId: string, applicationId: string,) {
        return this.httpClient.patch<any>(`${environment.apiUrl}/biddings/${biddingId}/applications/${applicationId}/pending`, null);
    }
}
