import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../../shared/objects/page";
import {environment} from "../../../../environments/environment";
import {ManagerResponseDto} from '../../../shared/models/manager-response.dto';

@Injectable({
    providedIn: 'root'
})
export class ManagerService {

    constructor(private httpClient: HttpClient) {
    }

    get(): Observable<Page<ManagerResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/managers?${window.location.search.substr(1)}`);
    }

    search(input: string): Observable<Page<ManagerResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/managers`, {
            params: {
                search: input
            }
        });
    }

    getById(id: string): Observable<ManagerResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/managers/${id}`);
    }

    delete(id: string): Observable<ManagerResponseDto> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/managers/${id}`);
    }

    save(model: ManagerResponseDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/managers`, model);
    }

    update(id: string, model: ManagerResponseDto): Observable<void> {
        return this.httpClient.put<any>(`${environment.apiUrl}/managers/${id}`, model);
    }

    sendAgain(id: string) {
        return this.httpClient.post<any>(`${environment.apiUrl}/managers/${id}/resend-emails`, null);
    }

}
