import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {OrganizationResponseDto} from "../../../shared/models/organization-response.dto";
import {ManagerResponseDto} from "../../../shared/models/manager-response.dto";
import {Page} from "../../../shared/objects/page";
import {environment} from "../../../../environments/environment";
import {catchError, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {StatusHelper} from "../../../shared/helpers/status.helper";
import {OrganizationStatusEnum} from "../../../shared/enums/organization-status-enum";
import {OrganizationRequestDto} from "../../../shared/models/organization-request-dto";

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(private httpClient: HttpClient) {}

    get(queryParams?: any): Observable<Page<OrganizationResponseDto>> {
        if (queryParams) {
            return this.httpClient.get<any>(`${environment.apiUrl}/organizations`, {
                params: queryParams
            });
        }
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations?${window.location.search.substr(1)}`);
    }

    getAll(): Observable<Page<OrganizationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations?itemsPerPage=1000`);
    }

    getStatusHelper(): Observable<Page<OrganizationResponseDto>> {
        return this.get().pipe(map(value => {
            value.items = value.items.map(i => {
                i.statuses = StatusHelper.organizations(OrganizationStatusEnum[i.status]);
                return i;
            });
            return value;
        }));
    }

    getById(id: string): Observable<OrganizationResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${id}`);
    }

    getByIdStatusHelper(id: string): Observable<OrganizationResponseDto> {
        return this.getById(id).pipe(map(value => {
            value.statuses = StatusHelper.organizations(OrganizationStatusEnum[value.status]);
            return value;
        }));
    }

    save(model: OrganizationRequestDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/organizations`, model);
    }

    update(id: string, model: OrganizationRequestDto): Observable<any> {
        return this.httpClient.put<any>(`${environment.apiUrl}/organizations/${id}`, model);
    }

    updateStatusApprove(id: string): Observable<OrganizationResponseDto> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/organizations/${id}/approve`, null);
    }

    updateStatusReprove(id: string, reason: string): Observable<OrganizationResponseDto> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/organizations/${id}/reprove`, {
            reason: reason
        });
    }

    updateStatusDisable(id: string): Observable<OrganizationResponseDto> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/organizations/${id}/disable`, null);
    }

    getManager(id: string, organizationId: string): Observable<ManagerResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/managers/${id}`);
    }

    // do not delete it
    checkIfIdentityExists(identity: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/access-requests/tax-identification-number/${identity}/exists`).pipe(
            map(response => true),
            catchError((error: HttpErrorResponse) => {
                return of(false);
            })
        );
    }

    getByStatusActive(businessNameTradeNameOrTaxIdentification: string):Observable<Page<OrganizationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations?search=${businessNameTradeNameOrTaxIdentification}&status=ACTIVE&itemsPerPage=1000`);
    }

    // get user from organization
    getUserFromOrganization(organizationId: string, keycloakId: string): Observable<ManagerResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/managers/keycloak-id/${keycloakId}`);
    }

    // /organizations/tax-identification-number/{taxIdentificationNumber}
    findByTaxIdentificationNumber(taxIdentificationNumber: string): Observable<OrganizationResponseDto> {
        return this.httpClient.get<any>(`https://dev.eureciclo.io/giro-organizations/organizations/tax-identification-number/${taxIdentificationNumber}`);
    }

    //  /organization/{organizationId}/cigs/pickups
    //  /organization/{organizationId}/cigs/valuers
    //  /organization/{organizationId}/cigs/pretreatments
    getOrganizationCigByManagerType(input: string, type: string, organizationId: string): Observable<Page<OrganizationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/cigs/${type}?search=${input}&status=ACTIVE`);
    }

}
