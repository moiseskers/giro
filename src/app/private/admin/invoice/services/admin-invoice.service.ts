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
import {OrganizationService} from '../../../shared/services/organization.service';
import {OrganizationResponseDto} from '../../../../shared/models/organization-response.dto';
import {InvoiceReadFileResponseDto} from '../../../../shared/models/invoice-read-file-response.dto';
import {InvoiceItemResponseDto} from '../../../../shared/models/invoice-item-response.dto';
import {DocumentRequestDto} from '../../../../shared/models/document-request.dto';

@Injectable()
export class AdminInvoiceService {

    constructor(private organizationService: OrganizationService, private httpClient: HttpClient) {}

    get(): Observable<Page<InvoiceResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/invoices?${window.location.search.substr(1)}`);
    }

    getByIdStatusHelper(id: string): Observable<InvoiceResponseDto> {
        return this.getById(id).pipe(
            map(value => {
                value.statuses = StatusHelper.invoiceStatus(InvoiceStatus[value.status]);
                return value;
            })
        );
    }

    getById(id: string): Observable<InvoiceResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/invoices/${id}`);
    }

    getItems(id: string, $event?: any): Observable<Page<InvoiceItemResponseDto>> {
        // return this.httpClient.get<any>(`http://localhost:3000/invoices?${window.location.search.substr(1)}`);
        return this.httpClient.get<any>(`${environment.apiUrl}/invoices/${id}/items`, { params: $event });
    }

    save(model: InvoiceRequestDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/invoices`, model);
    }

    update(id: string, model: InvoiceRequestDto): Observable<void> {
        return this.httpClient.put<any>(`${environment.apiUrl}/invoices/${id}`, model);
    }

    readFile(file: string): Observable<InvoiceReadFileResponseDto> {
        return this.httpClient.post<any>(`${environment.apiUrl}/invoices/read-file`, {
            file: file
        });
    }

    filters(): Observable<InvoiceReadFileResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/invoices/filter-options`);
    }

    findByTaxIdentificationNumber(taxIdentificationNumber: string): Observable<OrganizationResponseDto> {
        return this.organizationService.findByTaxIdentificationNumber(taxIdentificationNumber);
    }

    getStatusHelper(): Observable<Page<InvoiceResponseDto>> {
        return this.get().pipe(
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
    getDownloads(invoiceId: string, $event: any): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}/invoices/${invoiceId}/attachments`, { params: $event });
    }

    saveDownload(invoiceId: string, model: DocumentRequestDto): Observable<void> {
        return this.httpClient.post<any>(`${environment.apiUrl}/invoices/${invoiceId}/attachments`, model);
    }

    getDownload(invoiceId: string, attachmentId: string): Observable<void> {
        return this.httpClient.get<any>(`${environment.apiUrl}/invoices/${invoiceId}/attachments/${attachmentId}`);
    }

    deleteDownload(invoiceId: string, attachmentId: string): Observable<void> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/invoices/${invoiceId}/attachments/${attachmentId}`);
    }
    //####DOWNLOAD END###############################################################################################################

}
