import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {MediaLinkResponseDto} from '../../../shared/models/media-link-response.dto';
import {Page} from '../../../shared/objects/page';
import {CreateMediaLinkDto} from '../../../shared/models/create-media-link.dto';
import {MaterialDocumentResponseDto} from '../../../shared/models/material-document-response.dto';
import {MaterialDocumentRequestDto} from '../../../shared/models/material-document-request.dto';

@Injectable({
    providedIn: 'root'
})
export class InformativeService {

    constructor(private httpClient: HttpClient) {}

    get($event?: any): Observable<Page<MediaLinkResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/media-links?${window.location.search.substr(1)}`, {
            params: $event
        });
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/media-links/${id}`);
    }

    addVideo(model: CreateMediaLinkDto): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/media-links`, model);
    }

    getInformativeMaterials($event?: any): Observable<Page<MaterialDocumentResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/informative-materials?${window.location.search.substr(1)}`, {
            params: $event
        });
    }

    deleteInformativeMaterials(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/informative-materials/${id}`);
    }

    addInformativeMaterials(model: MaterialDocumentRequestDto): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/informative-materials`, model);
    }

    download(id: string): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}/informational-materials/${id}`);
    }

}
