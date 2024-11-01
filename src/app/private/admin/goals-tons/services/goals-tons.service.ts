import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralHelper } from '../../../../shared/helpers/general-helper';
import { CategoryType } from '../../../../shared/types/category.type';
import { ResponseGoalDto } from '../../../../shared/models/response-goal.dto';
import { environment } from '../../../../../environments/environment.development';
import { Page } from 'src/app/shared/objects/page';
import { OrganizationResponseDto } from 'src/app/shared/models/organization-response.dto';
import { DocumentRequestDto } from 'src/app/shared/models/document-request.dto';

@Injectable()
export class GoalsTonsService {
    constructor(private httpClient: HttpClient) {}

    uploadReportsPartners($event: DocumentRequestDto, type: string): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/reports/materials/type/${type}/upload`, $event);
    }

    getReportsGoal($event?: {
        categoryId: CategoryType;
        complianceYear: string;
        type: string;
    }): Observable<Page<ResponseGoalDto>> {
        return this.httpClient.get<any>(
            `${environment.apiUrl}/reports/materials/category-id/${$event?.categoryId}/complaince-year/${$event?.complianceYear}/type/${$event?.type}`
        );
    }

    getReportsGoalId($event?: {
        organizationId: string;
        categoryId: CategoryType;
        complianceYear: string;
        type: string;
    }): Observable<Page<ResponseGoalDto>> {
        return this.httpClient.get<any>(
            `${environment.apiUrl}/organizations/${$event?.organizationId}/reports/materials/category-id/${$event?.categoryId}/complaince-year/${$event?.complianceYear}/type/${$event?.type}`
        );
    }

    download() {
        return this.httpClient
            .get(`${environment.apiUrl}/inventories/export-csv`, {
                responseType: 'blob',
            })
            .pipe(map((value) => GeneralHelper.downloadBlob(value)));
    }

    getIndustrialDeclarationsByYear(year: number) {
        return this.httpClient.get<any>(
            `${environment.apiUrl}/reports/producer-declarations/monthly-summary/year/${year}`
        );
    }

    getIndustrialDeclarationsByYearById(year: number, organizationId: string) {
        return this.httpClient.get<any>(
            `${environment.apiUrl}/organizations/${organizationId}/reports/producer-declarations/monthly-summary/year/${year}`
        );
    }

    getProducers(search: string): Observable<Page<OrganizationResponseDto>> {
        return this.httpClient.get<any>(
            `${environment.apiUrl}/organizations?search=${search}&organizationTypes=PRODUCER&status=ACTIVE&itemsPerPage=1000`
        );
    }
}
