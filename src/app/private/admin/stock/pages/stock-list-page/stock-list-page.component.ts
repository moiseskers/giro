import {Component, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {StockResponseDto} from '../../../../../shared/models/stock-response.dto';
import {Page} from '../../../../../shared/objects/page';
import {lastValueFrom} from 'rxjs';
import {PaginatorHelper} from '../../../../../shared/helpers/paginator.helper';
import {SortHelper} from '../../../../../shared/helpers/sort.helper';
import {FilterHelper} from '../../../../../shared/helpers/filter.helper';
import {NGXLogger} from 'ngx-logger';
import {StockService} from '../../services/stock.service';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {FieldV2} from '../../../../../shared/components/dynamic-form-builder-ng-model/models/fieldV2';
import {LeadsService} from '../../../../shared/services/leads.service';
import {LeadsMaterialResponseDto, LeadsResponseDto} from '../../../../../shared/models/leads-response.dto';
import {AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';

@Component({
    selector: 'app-stock-list-page',
    templateUrl: './stock-list-page.component.html',
    styleUrl: './stock-list-page.component.scss'
})
export class StockListPageComponent {

    fields: FieldV2[] =  [
        {
            base: true,
            type: 'text',
            name: 'search',
            placeholder: 'Buscar por numero de factura o ID de declaración'
        },
        {
            name: 'categoryIds',
        },
        {
            name: 'subcategoryIds',
        },
        {
            name: 'materialIds',
        },
        {
            name: 'complianceYears',
        }
    ];

    //####working in filter here END###############################################################################################################
    @ViewChild(Table) table: Table;

    saveLoaderId = UuidHelper.get();
    loaderId = UuidHelper.get();
    filerLoaderId = UuidHelper.get();
    downloadId: string = UuidHelper.get();
    totalizerIsLoading  = true;

    model: Page<StockResponseDto>;
    public modelIn = (model: StockResponseDto) => model;

    //####attributes related to categories autocomplete START###############################################################################################################
    categories: LeadsResponseDto[] = [];
    categoryFiltered: LeadsResponseDto[];

    subcategories: LeadsResponseDto[];
    subcategoryFiltered: LeadsResponseDto[];

    materials: LeadsMaterialResponseDto[];
    materialFiltered: LeadsResponseDto[];

    categoryLoaderId: string = UuidHelper.get();
    subcategoryLoaderId: string = UuidHelper.get();
    materialLoaderId: string = UuidHelper.get();
    //####attributes related to categories autocomplete END###############################################################################################################

    constructor(
        private log: NGXLogger,
        private service: StockService,
        private leadsService: LeadsService,
        public loaderService: LoaderServiceV2) {
    }

    ngDoCheck(): void {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.loaderId);
        this.categories =  (await this.loaderService.activateLoader(() => lastValueFrom(this.leadsService.categories()), this.categoryLoaderId)).items;
        this.totalizerIsLoading = false;
    }

    page($event: any): void {
        PaginatorHelper.page($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.loaderId);
        });
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.loaderId);
        });
    }

    filter($event: any): void {
        FilterHelper.filter($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.loaderId);
        });
    }

    async download() {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.download()), this.downloadId);
    }

    //####AUTOCOMPLETE CATEGORY START###############################################################################################################
    async ngModelChange(fieldName: string, field: FieldV2) {
        if (fieldName === 'categoryIds') {
            if (!GeneralHelper.isEmptyOrUndefinedOrNull(field?.value)) {
                this.resetSubcategoriesValues();
                this.resetMaterialsValues();
                await this.getSubcategories(field.value);
            }
        }

        if (fieldName === 'subcategoryIds') {
            if (!GeneralHelper.isEmptyOrUndefinedOrNull(field?.value)) {
                this.resetMaterialsValues()
                const categoryIds = this.fields.filter(field => field.name === 'categoryIds')[0].value;
                await this.getMaterials(categoryIds, field?.value);
            }
        }
    }

    resetSubcategoriesValues() {
        const field = this.fields.filter(field => field.name === 'subcategoryIds')[0];
        field.value = '';
    }

    resetMaterialsValues() {
        const field = this.fields.filter(field => field.name === 'materialIds')[0];
        field.value = '';
    }

   async getSubcategories(categoryId: string) {
        this.subcategories = (await this.loaderService.activateLoader(() => lastValueFrom(this.leadsService.subcategories(categoryId)), this.subcategoryLoaderId)).items;
    }

    async getMaterials(categoryId: string, subcategory: string) {
        this.materials = (await this.loaderService.activateLoader(() => lastValueFrom(this.leadsService.materialsBySubCategoryId(categoryId, subcategory)), this.materialLoaderId)).items;
    }

    filterCategory(event: AutoCompleteCompleteEvent) {
        this.categoryFiltered = this.filterHelper(event, this.categories);
    }

    filterSubcategory($event: AutoCompleteCompleteEvent) {
        this.subcategoryFiltered = this.filterHelper($event, this.subcategories );
    }

    filterMaterial($event: AutoCompleteCompleteEvent) {
        this.materialFiltered = this.filterHelper($event, this.materials);
    }

    filterHelper(event: AutoCompleteCompleteEvent, array: any[]): any[] {
        let filtered: any[] = [];
        let query = GeneralHelper.removeDiacritics(event.query.toLowerCase()); // Remove accents from the query
        this.log.debug('category filter called', query);
        for (let i = 0; i < (array as any[]).length; i++) {
            let value = (array as any[])[i];
            let name = GeneralHelper.removeDiacritics((value.name.toLowerCase())); // Remove accents from city name
            if (name.indexOf(query) === 0) {
                filtered.push(value);
            }
        }
        return filtered;
    }
    //####AUTOCOMPLETE CATEGORY END###############################################################################################################


}
