// producer-declaration.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentRequestDto } from 'src/app/shared/models/document-request.dto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProduderDeclarationService {
    constructor(private httpClient: HttpClient) {}

    importDeclaration(organizationId: string, id: string, documents: DocumentRequestDto): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/organizations/${organizationId}/declarations/${id}/import`, documents);
    }
}
