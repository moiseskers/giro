import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Page} from "../../../shared/objects/page";
import {DeclarationResponseDto} from "../../../shared/models/declaration-response.dto";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DeclarationService {

    constructor(private httpClient: HttpClient) {}

    // /organizations/{organizationId}/declarations
    get(organizationId: string): Observable<Page<DeclarationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/declarations?${window.location.search.substr(1)}`)
    }

    // /organizations/{organizationId}/declarations
    update(organizationId: string, id: string, model: DeclarationResponseDto): Observable<Page<DeclarationResponseDto>> {
        return this.httpClient.put<any>(`${environment.apiUrl}/organizations/${organizationId}/declarations/${id}`, model)
    }

    // /organizations/{organizationId}/declarations/{id}
    byId(organizationId: string, id: string): Observable<Page<DeclarationResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/declarations/${id}`)
    }

    // okay /organizations/{organizationId}/declarations
    items(organizationId: string, id: string, $event: any) {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/declarations/${id}/items`, {params: $event})
    }

    // /organizations/{organizationId}/declarations/filter-options
    filters(organizationId: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/declarations/filter-options`);
    }
}
