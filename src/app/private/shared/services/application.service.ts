import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {GroupResponseDto} from "../../../shared/models/group-response.dto";
import {ApplicationResponseDto} from "../../../shared/models/application-response.dto";
import {Page} from "../../../shared/objects/page";

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {

    constructor(private httpClient: HttpClient) {
    }

    get(organizationId: string): Observable<Page<ApplicationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/applications?${window.location.search.substr(1)}`);
    }

    byId(organizationId: string, id: string): Observable<ApplicationResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/applications/${id}`);
    }

    getAttachments(): Observable<GroupResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/biddings/applications/attachments`);
    }

    // okay
    getAttachmentsByApplicationId(applicationId: string, $event: any): Observable<Page<ApplicationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/applications/${applicationId}/attachments`, {params: $event});
    }

    filterOptions(): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}/applications/filter-options`);
    }

    download(evaluationId: string, id: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/applications/${evaluationId}/attachments/${id}`);
    }

}
