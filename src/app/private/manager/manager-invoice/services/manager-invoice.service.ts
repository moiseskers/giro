import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Page} from "../../../../shared/objects/page";
import {map} from "rxjs/operators";
import {StatusHelper} from "../../../../shared/helpers/status.helper";
import {InvoiceResponseDto} from '../../../../shared/models/invoice-response.dto';
import {InvoiceStatus} from '../../../../shared/enums/invoice-status';
import {InvoiceRequestDto} from '../../../../shared/models/invoice-request.dto';
import {environment} from '../../../../../environments/environment';
import {InvoiceReadFileResponseDto} from '../../../../shared/models/invoice-read-file-response.dto';
import {GeneralHelper} from '../../../../shared/helpers/general-helper';
import {DocumentRequestDto} from '../../../../shared/models/document-request.dto';

@Injectable()
export class ManagerInvoiceService {

    constructor(private httpClient: HttpClient) {}

    get(organizationId: string): Observable<Page<InvoiceResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/invoices?${window.location.search.substr(1)}`);
    }

    getById(id: string): Observable<InvoiceResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/invoices/${id}`);
    }

    save(organizationId: string, model: DocumentRequestDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/organizations/${organizationId}/invoices`,
            {
                document: model
            }
        );
    }

    update(id: string, model: InvoiceRequestDto): Observable<void> {
        return this.httpClient.put<any>(`${environment.apiUrl}/invoices/${id}`, model);
    }

    filters(): Observable<InvoiceReadFileResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/invoices/filter-options`);
    }

    getStatusHelper(organizationId: string): Observable<Page<InvoiceResponseDto>> {
        return this.get(organizationId).pipe(
            map(value => {
                value.items = value.items.map(i => {
                    i.statuses = StatusHelper.invoiceStatus(InvoiceStatus[i.status]);
                    return i;
                });
                return value;
            })
        );
    }

    inactive(id: string): Observable<void> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/invoices/${id}/reject`, null);
    }

    active(id: string): Observable<void> {
        return this.httpClient.patch<any>(`${environment.apiUrl}/invoices/${id}/approve`, null);
    }

    //####DOWNLOAD START###############################################################################################################
    getDownloads(invoiceId: string): Observable<void> {
        return this.httpClient.get(`${environment.apiUrl}/invoices/${invoiceId}/attachments/export`, { responseType: 'blob' }).pipe(map(value => GeneralHelper.downloadBlob(value)));

    }
    //####DOWNLOAD END###############################################################################################################

}
