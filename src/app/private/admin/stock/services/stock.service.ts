import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Page} from "../../../../shared/objects/page";
import {environment} from '../../../../../environments/environment';
import {StockResponseDto} from '../../../../shared/models/stock-response.dto';
import {GeneralHelper} from '../../../../shared/helpers/general-helper';
import {map} from 'rxjs/operators';

@Injectable()
export class StockService {

    constructor(private httpClient: HttpClient) {}

    get(): Observable<Page<StockResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/inventories?${window.location.search.substr(1)}`);
        // return this.httpClient.get<any>(`${environment.mockApi}/stocks?${window.location.search.substr(1)}`);
    }

    // /inventories/export-csv
    download(): Observable<void> {
        return this.httpClient.get(`${environment.apiUrl}/inventories/export-csv`, { responseType: 'blob' }).pipe(map(value => GeneralHelper.downloadBlob(value)));
    }
}
