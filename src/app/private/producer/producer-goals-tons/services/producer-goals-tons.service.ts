import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralHelper } from '../../../../shared/helpers/general-helper';
import { CategoryType } from '../../../../shared/types/category.type';
import { ResponseGoalDto } from '../../../../shared/models/response-goal.dto';
import { environment } from '../../../../../environments/environment.development';
import { Page } from 'src/app/shared/objects/page';
import { DocumentRequestDto } from 'src/app/shared/models/document-request.dto';

@Injectable()
export class ProduderGoalsTonsService {
    constructor(private httpClient: HttpClient) {}

    uploadCities($event: DocumentRequestDto): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/reports/industrial-declarations/upload`, $event);
    }

    uploadReportsPartners($event: DocumentRequestDto, type: string): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/reports/materials/type/${type}/upload`, $event);
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

    getIndustrialDeclarationsByYearById(year: number, organizationId: string) {
        return this.httpClient.get<any>(
            `${environment.apiUrl}/organizations/${organizationId}/reports/producer-declarations/monthly-summary/year/${year}`
        );
    }
}
