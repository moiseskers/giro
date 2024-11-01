import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Page} from "../../../shared/objects/page";
import {BranchResponseDto} from "../../../shared/models/branch-response.dto";
import {BranchRequestDto} from "../../../shared/models/branch-request.dto";

@Injectable({providedIn: "root"})
export class BranchService {

    constructor(private httpClient: HttpClient) {
    }

    get(organizationId: string): Observable<Page<BranchResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/branches?${window.location.search.substr(1)}`);
    }

    getById(organizationId: string,id: string): Observable<BranchResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/branches/${id}`);
    }

    delete(organizationId: string, id: string): Observable<BranchResponseDto> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/organizations/${organizationId}/branches/${id}`);
    }

    save(organizationId: string, model: BranchRequestDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/organizations/${organizationId}/branches`, model);
    }

    update(organizationId: string, id: string, model: BranchRequestDto): Observable<BranchResponseDto> {
        return this.httpClient.put<any>(`${environment.apiUrl}/organizations/${organizationId}/branches/${id}`, model);
    }

    getAll(type: string): Observable<Page<BranchResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/branches?organizationType=${type}&itemsPerPage=1000`);
    }

}
