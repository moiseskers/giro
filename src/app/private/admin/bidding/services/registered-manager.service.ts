import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {BiddingRequestDto} from "../../../../shared/models/bidding-request.dto";
import {RegisteredManagerResponseDto} from "../../../../shared/models/registered-manager-response.dto";
import {Page} from "../../../../shared/objects/page";
import {environment} from "../../../../../environments/environment";

@Injectable()
export class RegisteredManagerService {

    constructor(private httpClient: HttpClient) {
    }

    //okay
    get(biddingId: string, $event: any): Observable<Page<RegisteredManagerResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/biddings/${biddingId}/applications`, { params: $event });
        // return this.httpClient.get<any>(`http://localhost:3000/registered-manager`, { params: $event });
    }

    delete(biddingId: string, id: string): Observable<void> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/biddings/${id}`);
    }

    save(biddingId: string, model: BiddingRequestDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/biddings`, model);
    }

    download(id: string): Observable<Blob> {
        return this.httpClient.get(`${environment.apiUrl}/biddings/${id}/applications/export-csv`, { responseType: 'blob' });
    }

}
