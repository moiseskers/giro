// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {Observable} from "rxjs";
// import {environment} from "../../../../../environments/environment";
// import {Page} from "../../../../shared/objects/page";
// import {DocumentOutModel} from "../../../../shared/models/document-out.model";
// import {DocumentInModel} from "../../../../shared/models/document-in.model";
//
// @Injectable()
// export class ProcessFileService {
//
//     constructor(private httpClient: HttpClient) {
//     }
//
//     get(biddingId: string, $event: any): Observable<Page<DocumentInModel>> {
//         return this.httpClient.get<any>(`${environment.apiUrl}/biddings/${biddingId}/attachments`, { params: $event });
//     }
//
//     getById(biddingId: string,id: string): Observable<DocumentInModel> {
//         return this.httpClient.get<any>(`${environment.apiUrl}/biddings/${biddingId}/attachments/${id}`);
//     }
//
//     delete(biddingId: string, id: string): Observable<DocumentInModel> {
//         return this.httpClient.delete<any>(`${environment.apiUrl}/biddings/${biddingId}/attachments/${id}`);
//     }
//
//     save(biddingId: string, model: DocumentOutModel): Observable<void> {
//         return this.httpClient.post<any>(`${environment.apiUrl}/biddings/${biddingId}/attachments`, model);
//     }
//
//     update(biddingId: string, id: string, model: DocumentOutModel): Observable<void> {
//         return this.httpClient.put<any>(`${environment.apiUrl}/biddings/${biddingId}/attachments/${id}`, model);
//     }
//
//     download(biddingId: string, id: string) {
//         // https://dev.eureciclo.io/giro-gateway/biddings/d240a214-83e3-4183-b050-f86a64df8957/attachments/795ab00a-ca58-46b5-93bd-52a32f67276b
//         return this.httpClient.get<any>(`${environment.apiUrl}/biddings/${biddingId}/attachments/${id}`);
//     }
// }
