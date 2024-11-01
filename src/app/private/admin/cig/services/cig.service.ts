import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Page} from "../../../../shared/objects/page";
import {environment} from "../../../../../environments/environment";
import {CigResponseDto} from "../../../../shared/models/cig-response.dto";
import {CigRequestDto} from "../../../../shared/models/cig-request.dto";
import {OrganizationResponseDto} from "../../../../shared/models/organization-response.dto";
import {BranchResponseDto} from "../../../../shared/models/branch-response.dto";
import {map} from "rxjs/operators";
import {StatusHelper} from "../../../../shared/helpers/status.helper";
import {CigStatus} from "../../../../shared/enums/cig-status";

@Injectable()
export class CigService {

    constructor(private httpClient: HttpClient) {}

    getStatusHelper(): Observable<Page<CigResponseDto>> {
        return this.get().pipe(
            map(value => {
                value.items = value.items.map(i => {
                    i.statuses = StatusHelper.cigStatus(CigStatus[i.status]);
                    return i;
                });
                return value;
            })
        );
    }

    get(): Observable<Page<CigResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/cigs?${window.location.search.substr(1)}`);
    }
    
    inactive(id: string): Observable<any> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/cigs/${id}/disable`, null);
    }

    active(id: string): Observable<any> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/cigs/${id}/enable`, null);
    }

    save(model: CigRequestDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/cigs`, model);
    }

    consumer(input: string): Observable<Page<OrganizationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations?search=${input}&organizationTypes=INDUSTRIAL_CONSUMER&status=ACTIVE&itemsPerPage=1000`);
    }

    collector(input: string): Observable<Page<OrganizationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations?search=${input}&organizationTypes=MANAGER&organizationManagerTypes=PICKUP&status=ACTIVE&itemsPerPage=1000`);
    }

    pretreatment(input: string): Observable<Page<OrganizationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations?search=${input}&organizationTypes=MANAGER&organizationManagerTypes=PRETREATMENT&status=ACTIVE&itemsPerPage=1000`);
    }

    valorizer(input: string): Observable<Page<OrganizationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations?search=${input}&organizationTypes=MANAGER&organizationManagerTypes=VALUER&status=ACTIVE&itemsPerPage=1000`);
    }

    branches(organizationId: string, input: string): Observable<Page<BranchResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/branches?search=${input}&status=ACTIVE&itemsPerPage=1000`);
    }

}
