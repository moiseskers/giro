import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Page} from "../../../shared/objects/page";
import {CreateDeclarationRequestRequestDto} from "../../../shared/models/create-declaration-request-request.dto";
import {DeclarationResponseDto} from "../../../shared/models/declaration-response.dto";
import {DeclarationRequestResponseDto} from "../../../shared/models/declaration-request-response.dto";
import {map} from "rxjs/operators";
import {StatusHelper} from "../../../shared/helpers/status.helper";
import {environment} from "../../../../environments/environment";
import {DeclarationItemResponseDto} from "../../../shared/models/declaration-item-response.dto";
import {GeneralHelper} from "../../../shared/helpers/general-helper";
import {OrganizationResponseDto} from "../../../shared/models/organization-response.dto";

@Injectable({
    providedIn: 'root'
})
export class DeclarationRequestService {

    constructor(private httpClient: HttpClient) {}

    get(type: string): Observable<Page<DeclarationRequestResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/declarations-requests/type/${type}?${window.location.search.substr(1)}`);
    }

    getStatusHelper(type: string): Observable<Page<DeclarationRequestResponseDto>> {
        return this.get(type).pipe(map(value => {
            value.items = value.items.map(i => {
                i.statuses = StatusHelper.mass(i.status, true);
                return i;
            });
            return value;
        }));
    }

    filters(type: string): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}/declarations-requests/type/${type}/filter-options`);
    }

    filtersDeclaration(id: string): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}/declarations-requests/${id}/declarations/filter-options`);
    }

    save(type: string, input: CreateDeclarationRequestRequestDto): Observable<Page<CreateDeclarationRequestRequestDto>> {
        return this.httpClient.post<any>(`${environment.apiUrl}/declarations-requests/type/${type}`, input);
    }

    update(input: CreateDeclarationRequestRequestDto, id: string): Observable<any> {
        return this.httpClient.put<any>(`${environment.apiUrl}/declarations-requests/${id}`, input);
    }

    byId(id: string): Observable<DeclarationRequestResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/declarations-requests/${id}`);
    }

    block(id: string): Observable<any> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/declarations-requests/${id}/block`, null);
    }

    unblock(id: string): Observable<any> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/declarations-requests/${id}/unblock`, null);
    }

    byIdStatusHelper(id: string): Observable<DeclarationRequestResponseDto> {
        return this.byId(id).pipe(map(value => {
            value.statuses = StatusHelper.mass(value.status);
            return value;
        }));
    }

    //okay
    getDeclarations(id: string, $event: any): Observable<Page<DeclarationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/declarations-requests/${id}/declarations`, {params: $event});
    }

    // /declarations-requests/{id}/export-csv
    download(id: string): Observable<Blob> {
        return this.httpClient.get(`${environment.apiUrl}/declarations-requests/${id}/export-csv`, { responseType: 'blob' });
    }

    downloadDirectly(id: string) {
        this.download(id).subscribe((blob: Blob) => {
            GeneralHelper.downloadBlob(blob);
        });
    }

    verifyRemovedProducers(requestDeclarationId: string, input: CreateDeclarationRequestRequestDto): Observable<{result: boolean}> {
        return this.httpClient.post<any>(`${environment.apiUrl}/declarations-requests/${requestDeclarationId}/verify-removed-organizations`, input);
    }

    declarationById(requestDeclarationId: string, id: string): Observable<DeclarationResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/declarations-requests/${requestDeclarationId}/declarations/${id}`);
    }

    // okay /declarations-requests/{requestId}/declarations/{id}/items
    declarationItems(requestId: string, id: string, $event: any): Observable<Page<DeclarationItemResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/declarations-requests/${requestId}/declarations/${id}/items`, {params: $event});
    }

    // /declarations-requests/{requestId}/declarations/{id}
    declarationsUpdate(input: DeclarationResponseDto, requestId: string, id: string): Observable<any> {
        return this.httpClient.put<any>(`${environment.apiUrl}/declarations-requests/${requestId}/declarations/${id}`, input);
    }

    // okay /declarations-requests/{requestId}/declarations/{id}/audits
    history(requestId: string, id: string, $event: any): Observable<Page<any>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/declarations-requests/${requestId}/declarations/${id}/audits`, {params: $event});
    }

    downloadHistory(requestId: string,declarationId: string,  auditId: string): Observable<Blob> {
        return this.httpClient.get(`${environment.apiUrl}/declarations-requests/${requestId}/declarations/${declarationId}/audits/${auditId}/export-csv`, { responseType: 'blob' });
    }

    downloadHistoryDirectly(requestId: string,declarationId: string, auditId: string) {
        this.downloadHistory(requestId, declarationId, auditId).subscribe((blob: Blob) => {
            GeneralHelper.downloadBlob(blob);
        });
    }

    approve(declarationRequestId: string, declarationId: string): Observable<any> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/declarations-requests/${declarationRequestId}/declarations/${declarationId}/approve`, null);
    }

    organizationsSearch(type: string): Observable<Page<OrganizationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations?organizationTypes=${type}&status=ACTIVE&itemsPerPage=1000`);
    }
}
