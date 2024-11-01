import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {DocumentOutModel} from "../../../../shared/models/document-out.model";

@Injectable()
export class AttachmentService {

    constructor(private httpClient: HttpClient) {}

    save(organizationId: string, model: DocumentOutModel): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/organizations/${organizationId}/attachments`, model);
    }

}
