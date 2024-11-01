import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Page} from "../../../shared/objects/page";
import {ManagerResponseDto} from '../../../shared/models/manager-response.dto';

@Injectable({providedIn: "root"})
export class OrganizationUserService {

    constructor(private httpClient: HttpClient) {}

    // okay
    get(organizationId: string, $event: any): Observable<Page<ManagerResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/managers`, { params: $event });
    }

    getById(organizationId: string,id: string): Observable<ManagerResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/managers/${id}`);
    }

    delete(organizationId: string, id: string): Observable<ManagerResponseDto> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/organizations/${organizationId}/managers/${id}`);
    }

    save(organizationId: string, model: ManagerResponseDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/organizations/${organizationId}/managers`, model);
    }

    update(organizationId: string, id: string, model: ManagerResponseDto): Observable<void> {
        return this.httpClient.put<any>(`${environment.apiUrl}/organizations/${organizationId}/managers/${id}`, model);
    }

    sendAgain(): Observable<void> {
        throw Error('endpoint not implemented yet!!!');
    }

}
