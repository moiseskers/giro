import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../../../shared/objects/page';
import {ResponseCityDto} from '../../../shared/models/response-city.dto';
import {map} from 'rxjs/operators';
import {GeneralHelper} from '../../../shared/helpers/general-helper';
import {PartnerResponseDto} from '../../../shared/models/partner-response.dto';
import {DocumentRequestDto} from '../../../shared/models/document-request.dto';
import {CategoryType} from '../../../shared/types/category.type';
import {ResponseGoalDto} from '../../../shared/models/response-goal.dto';

@Injectable({
        providedIn: 'root',
})
export class DashboardService {

    constructor(private httpClient: HttpClient) {
    }

    getCities($event?: any): Observable<Page<ResponseCityDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/reports/cities`, { params: $event });
    }

    uploadCities($event: DocumentRequestDto): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/reports/cities/upload`, $event);
    }

    uploadReportsPartners($event: DocumentRequestDto): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/reports/partners/upload`, $event);
    }

    getReportsPartners($event?: any): Observable<PartnerResponseDto> {
        return this.httpClient.get<any>(`${environment.apiUrl}/reports/partners`, { params: $event });
    }

    getReportsGoal($event?: {
        categoryId: CategoryType,
        complianceYear: string,
    }): Observable<Page<ResponseGoalDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/reports/goals`, { params: $event });
    }

    // TODO integrate
    download() {
        return this.httpClient.get(`${environment.apiUrl}/reports/summary/export`, { responseType: 'blob' }).pipe(
            map(value => GeneralHelper.downloadBlob(value)));
    }



}
