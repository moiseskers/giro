import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../../shared/objects/page";
import {environment} from "../../../../environments/environment";
import {DocumentResponseDto} from "../../../shared/models/document-response.dto";
import {DocumentRequestDto} from '../../../shared/models/document-request.dto';

@Injectable({providedIn: "root"})
export class DocumentService {

    constructor(private httpClient: HttpClient) {
    }

    // okay
    get(organizationId: string, $event: any): Observable<Page<DocumentResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/attachments`, { params: $event });
    }

    getById(organizationId: string,id: string): Observable<DocumentResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/attachments/${id}`);
    }

    delete(organizationId: string, id: string): Observable<DocumentResponseDto> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/organizations/${organizationId}/attachments/${id}`);
    }

    save(organizationId: string, model: DocumentRequestDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/organizations/${organizationId}/attachments`, model);
    }

    update(organizationId: string, id: string, model: DocumentRequestDto): Observable<void> {
        return this.httpClient.put<any>(`${environment.apiUrl}/organizations/${organizationId}/attachments/${id}`, model);
    }

    download(organizationId: string, id: string) {
        // https://dev.eureciclo.io/giro-gateway/organizations/d240a214-83e3-4183-b050-f86a64df8957/attachments/795ab00a-ca58-46b5-93bd-52a32f67276b
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/attachments/${id}`);
    }

}
