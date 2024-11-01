import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../../shared/objects/page";
import {environment} from "../../../../environments/environment";
import {LegalRepresentativeRequestDto} from "../../../shared/models/legal-representative-request.dto";
import {LegalRepresentativeResponseDto} from "../../../shared/models/legal-representative-response.dto";

@Injectable({providedIn: "root"})
export class LegalRepresentativeService {

    constructor(private httpClient: HttpClient) {
    }

    get(organizationId: string): Observable<Page<LegalRepresentativeResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/legal-representatives?${window.location.search.substr(1)}`);
    }

    getById(organizationId: string,id: string): Observable<LegalRepresentativeResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/legal-representatives/${id}`);
    }

    delete(organizationId: string, id: string): Observable<LegalRepresentativeResponseDto> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/organizations/${organizationId}/legal-representatives/${id}`);
    }

    save(organizationId: string, model: LegalRepresentativeRequestDto): Observable<LegalRepresentativeResponseDto> {
        return this.httpClient.post<any>(`${environment.apiUrl}/organizations/${organizationId}/legal-representatives`, model);
    }

    update(organizationId: string, id: string, model: LegalRepresentativeRequestDto): Observable<LegalRepresentativeResponseDto> {
        return this.httpClient.put<any>(`${environment.apiUrl}/organizations/${organizationId}/legal-representatives/${id}`, model);
    }

}
