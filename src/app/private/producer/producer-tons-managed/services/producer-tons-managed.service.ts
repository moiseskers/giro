import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Page } from '../../../../shared/objects/page';
import { map } from 'rxjs/operators';
import { GeneralHelper } from '../../../../shared/helpers/general-helper';
import { ResponseGoalDto } from '../../../../shared/models/response-goal.dto';
import { DocumentRequestDto } from 'src/app/shared/models/document-request.dto';

@Injectable()
export class ProducerTonsManagedService {
    constructor(private httpClient: HttpClient) {}

    uploadCities($event: DocumentRequestDto): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/reports/industrial-declarations/upload`, $event);
    }

    organizationsReportsIndustrialDeclarationsComplianceYear(
        organizationId: string,
        complianceYear: string
    ): Observable<Page<ResponseGoalDto>> {
        return this.httpClient
            .get<any>(
                `${environment.apiUrl}/organizations/${organizationId}/reports/industrial-declarations/compliance-year/${complianceYear}`
            )
            .pipe(
                map((response) => {
                    if (response === null || response === undefined) {
                        return {
                            items: [],
                        };
                    }
                    return response;
                })
            );
    }

    organizationsReportsIndustrialDeclarationsComplianceYearComplianceMonth(
        organizationId: string,
        complianceYear: string,
        complianceMonth: string,
        queryParams?: any
    ) {
        return this.httpClient
            .get<any>(
                `${environment.apiUrl}/organizations/${organizationId}/reports/industrial-declarations/compliance-year/${complianceYear}/compliance-month/${complianceMonth}`,
                {
                    params: queryParams,
                }
            )
            .pipe(
                map((response) => {
                    if (response === null || response === undefined) {
                        return {
                            items: [],
                        };
                    }
                    return response;
                })
            );
    }

    industrialDeclarationsComplianceMonth(
        complianceYear: string,
        complianceMonth: string,
        queryParams?: any
    ): Observable<Page<ResponseGoalDto>> {
        return this.httpClient
            .get<any>(
                `${environment.apiUrl}/reports/industrial-declarations/compliance-year/${complianceYear}/compliance-month/${complianceMonth}`,
                {
                    params: queryParams,
                }
            )
            .pipe(
                map((response) => {
                    if (response === null || response === undefined) {
                        return {
                            items: [],
                        };
                    }
                    return response;
                })
            );
    }

    downloadByOrganizationId(organizationId: string) {
        return this.httpClient
            .get(
                `${environment.apiUrl}/organizations/${organizationId}/reports/industrial-declarations/export-csv`,
                { responseType: 'blob' }
            )
            .pipe(map((value) => GeneralHelper.downloadBlob(value)));
    }
}
