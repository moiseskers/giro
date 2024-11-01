import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";
import {RequestAccessOutModel} from "../model/request-access-document.model";
import {GroupResponseDto} from "../../../../shared/models/group-response.dto";

@Injectable()
export class ApiService {

    constructor(private httpClient: HttpClient) {
    }

    save(model: RequestAccessOutModel): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/access-requests`, model);
    }

    checkIfEmailExists(email: string): Observable<boolean> {
        return this.httpClient.get<any>(`${environment.apiUrl}/access-requests/email/${email}/exists`).pipe(
            map(response => true),
            catchError((error: HttpErrorResponse) => {
                return of(false);
            })
        );
    }

    // DO NOT EVER DELETE IT
    checkIfIdentityExists(identity: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/access-requests/tax-identification-number/${identity}/exists`).pipe(
            map(response => true),
            catchError((error: HttpErrorResponse) => {
                return of(false);
            })
        );
    }

    getDocuments(): Observable<GroupResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/access-requests/attachments`)
    }

}
