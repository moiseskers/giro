// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {Observable} from "rxjs";
// import {Page} from "../../../../shared/objects/page";
// import {environment} from "../../../../../environments/environment";
// import {RegisteredManagerInModel} from "../../../../shared/models/registered-manager-in.model";
// import {BiddingOutModel} from "../../../../shared/models/bidding-out.model";
//
// @Injectable()
// export class RegisteredManagerService {
//
//     constructor(private httpClient: HttpClient) {
//     }
//
//     get(biddingId: string, $event: any): Observable<Page<RegisteredManagerInModel>> {
//         // return this.httpClient.get<any>(`${environment.apiRequestGiroBiddingUrl}/biddings/${biddingId}/applications?${window.location.search.substr(1)}`);
//     }
//
//     delete(biddingId: string, id: string): Observable<void> {
//         return this.httpClient.delete<any>(`${environment.apiUrl}/biddings/${id}`);
//     }
//
//     save(biddingId: string, model: BiddingOutModel): Observable<void> {
//         return this.httpClient.post<any>(`${environment.apiUrl}/biddings`, model);
//     }
//
//     download(id: string): Observable<any> {
//         return this.httpClient.post<any>(`http://localhost:3000/biddings-by-id`, id);
//     }
//
// }
