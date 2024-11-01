import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../../shared/objects/page";
import {environment} from "../../../../environments/environment";
import {LeadsMaterialResponseDto, LeadsResponseDto} from '../../../shared/models/leads-response.dto';

@Injectable({providedIn: "root"})
export class LeadsService {

    constructor(private httpClient: HttpClient) {}

    // GET /categories
    categories(): Observable<Page<LeadsResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/categories?itemsPerPage=100`);
    }

    // GET /categories/:categoryId/subcategories
    subcategories(categoryId: string): Observable<Page<LeadsResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/categories/${categoryId}/subcategories?itemsPerPage=100`);
    }

    // subcategories/{id}/materials
    // GET /categories/:categoryId/subcategories/:subcategoryId/materials
    materialsBySubCategoryId(categoryId: string, subCategoryId: string): Observable<Page<LeadsMaterialResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/categories/${categoryId}/subcategories/${subCategoryId}/materials?itemsPerPage=100`);
    }

    // materialsBySubCategoryId(subCategoryId: string): Observable<Page<LeadsMaterialResponseDto>> {
    //     return this.httpClient.get<any>(`${environment.apiUrl}/subcategories/${subCategoryId}/materials`);
    // }

    materials(itemsPerPage: number = 100): Observable<Page<LeadsMaterialResponseDto>> {
        return this.httpClient.get<any>(`${environment.apiUrl}/materials`, {
            params: {
                itemsPerPage: itemsPerPage,
            }
        });
    }

}
