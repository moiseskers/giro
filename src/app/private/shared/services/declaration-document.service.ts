import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Page} from "../../../shared/objects/page";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DeclarationDocumentService {

    constructor(private httpClient: HttpClient) {}

    // okay users
    get(organizationId: string, declarationId: string, $event: any): Observable<Page<any>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/declarations/${declarationId}/attachments`, {params: $event});
    }

    getById(organizationId: string, declarationId: string, attachmentId: string): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/declarations/${declarationId}/attachments/${attachmentId}`);
    }

    create(organizationId: string, declarationId: string, model: any): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/organizations/${organizationId}/declarations/${declarationId}/attachments`, model);
    }

    // admin
    getAdmin(declarationId: string, $event: any): Observable<Page<any>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/declarations/${declarationId}/attachments`, {params: $event});
    }

    createAdmin(declarationId: string, model: any): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/declarations/${declarationId}/attachments`, model);
    }

    getByIdAdmin(declarationId: string, attachmentId: string): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}/declarations/${declarationId}/attachments/${attachmentId}`);
    }

    approveAdmin(declarationId: string, attachmentId: string): Observable<any> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/declarations/${declarationId}/attachments/${attachmentId}/approve`, null);
    }

    reproveAdmin(declarationId: string, attachmentId: string): Observable<any> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/declarations/${declarationId}/attachments/${attachmentId}/reprove`, null);
    }

    deleteAdmin(declarationId: string, attachmentId: string): Observable<any> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/declarations/${declarationId}/attachments/${attachmentId}`);
    }

}
