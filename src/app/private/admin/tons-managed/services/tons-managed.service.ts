import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../../../../shared/objects/page';
import {map} from 'rxjs/operators';
import {GeneralHelper} from '../../../../shared/helpers/general-helper';
import {ResponseGoalDto} from '../../../../shared/models/response-goal.dto';
import {DocumentRequestDto} from '../../../../shared/models/document-request.dto';

@Injectable()
export class TonsManagedService {

    constructor(private httpClient: HttpClient) {
    }

    // /reports/industrial-declarations/compliance-year/{complianceYear}
    industrialDeclarationsComplianceYear(complianceYear: string): Observable<Page<ResponseGoalDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/reports/industrial-declarations/compliance-year/${complianceYear}`)
        .pipe(
            map(response => {
                if (response === null || response === undefined) {
                    return {
                        items: []
                    };
                }
                return response;
            }),
        );
    }

    // /organizations/{organizationId}/reports/industrial-declarations/compliance-year/{complianceYear}
    organizationsReportsIndustrialDeclarationsComplianceYear(organizationId: string, complianceYear: string): Observable<Page<ResponseGoalDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/reports/industrial-declarations/compliance-year/${complianceYear}`)
            .pipe(
                map(response => {
                    if (response === null || response === undefined) {
                        return {
                            items: []
                        };
                    }
                    return response;
                }),
            );
    }

    organizationsReportsIndustrialDeclarationsComplianceYearComplianceMonth(organizationId: string,
                                                                            complianceYear: string,
                                                                            complianceMonth: string,
                                                                            queryParams?: any
    ) {
        return this.httpClient.get<any>(`${environment.apiUrl}/organizations/${organizationId}/reports/industrial-declarations/compliance-year/${complianceYear}/compliance-month/${complianceMonth}`, {
            params: queryParams
        })
            .pipe(
                map(response => {
                    if (response === null || response === undefined) {
                        return {
                            items: []
                        };
                    }
                    return response;
                }),
            );
    }

    industrialDeclarationsComplianceMonth(
        complianceYear: string,
        complianceMonth: string,
        queryParams?: any): Observable<Page<ResponseGoalDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/reports/industrial-declarations/compliance-year/${complianceYear}/compliance-month/${complianceMonth}`, {
            params: queryParams
        }).pipe(
            map(response => {
                if (response === null || response === undefined) {
                    return {
                        items: []
                    };
                }
                return response;
            }),
        );
    }

    uploadCities($event: DocumentRequestDto): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/reports/industrial-declarations/upload`, $event);
    }

    download() {
        return this.httpClient.get(`${environment.apiUrl}/reports/industrial-declarations/export-csv`, {responseType: 'blob'}).pipe(
            map(value => GeneralHelper.downloadBlob(value)));
    }

    downloadByOrganizationId(organizationId: string) {
        return this.httpClient.get(`${environment.apiUrl}/organizations/${organizationId}/reports/industrial-declarations/export-csv`, {responseType: 'blob'}).pipe(
            map(value => GeneralHelper.downloadBlob(value)));
    }

}
