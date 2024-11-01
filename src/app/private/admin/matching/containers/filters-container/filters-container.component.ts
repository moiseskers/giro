import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FieldV2} from '../../../../../shared/components/dynamic-form-builder-ng-model/models/fieldV2';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';
import {lastValueFrom} from 'rxjs';
import {AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {OrganizationResponseDto} from '../../../../../shared/models/organization-response.dto';
import {LeadsMaterialResponseDto, LeadsResponseDto} from '../../../../../shared/models/leads-response.dto';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {LeadsService} from '../../../../shared/services/leads.service';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {MatchingService} from '../../../../shared/services/matching.service';
import {NGXLogger} from 'ngx-logger';
import {Table} from 'primeng/table';
import {NgForm} from '@angular/forms';
import {MatchingResponseDto} from '../../../../../shared/models/matching-response.dto';
import {MatchingMenuItem} from '../../objects/matching-menu-item';


@Component({
    selector: 'app-filters-container',
    templateUrl: './filters-container.component.html',
    styleUrl: './filters-container.component.scss'
})
export class FiltersContainerComponent {

    //####autocomplete START###############################################################################################################
    categories: LeadsResponseDto[] = [];
    categoryFiltered: LeadsResponseDto[];

    subcategories: LeadsResponseDto[];
    subcategoryFiltered: LeadsResponseDto[];

    materials: LeadsMaterialResponseDto[];
    materialFiltered: LeadsResponseDto[];

    categoryLoaderId: string = UuidHelper.get();
    subcategoryLoaderId: string = UuidHelper.get();
    materialLoaderId: string = UuidHelper.get();
    producerLoaderId: string = UuidHelper.get();

    producerFiltered: OrganizationResponseDto[] = [];
    //####autocomplete END###############################################################################################################

    @Output() filterEvent = new EventEmitter();
    @Output() sortEvent = new EventEmitter();
    @Output() doMatchEvent = new EventEmitter();
    @Output() downloadEvent = new EventEmitter();

    @Input() table: Table;
    @Input() model: MatchingResponseDto;
    @Input() isLoadingDownloadButton: boolean = false;

    @ViewChild('form') form: NgForm;

    menuItems: MatchingMenuItem[] = [
        {
            id: "MATCHING",
            label: 'Hacer matching',
        },
        {
            id: 'SIMULATION',
            label: 'Hacer simulación de matching',
        }
    ]

    fields: FieldV2[] = [
        {
            base: true,
            placeholder: 'Buscar por ID de matching',
            name: 'search',
        },
        {
            name: 'category',
        },
        {
            name: 'subcategoryIds',
        },
        // {
        //     name: 'materialIds',
        // },
        {
            name: 'organizationIds',
        },
        {
            name: 'matchingDateBegin',
        },
        {
            name: 'matchingDateEnd',
        }
    ]

    matchingDate: any;

    constructor(
        public loaderService: LoaderServiceV2,
        private service: MatchingService,
        private leadsService: LeadsService,
        private log: NGXLogger,) {
    }

    async ngOnInit() {
        this.categories = (await this.loaderService.activateLoader(() => lastValueFrom(this.leadsService.categories()), this.categoryLoaderId)).items;
    }

    //####AUTOCOMPLETE START###############################################################################################################
    async ngModelChange(fieldName: string, field: FieldV2) {
        if (fieldName === 'category') {
            if (!GeneralHelper.isEmptyOrUndefinedOrNull(field?.value)) {
                this.resetSubcategoriesValues();
                // this.resetMaterialsValues();
                await this.getSubcategories(field.value);
            }
        }

        if (fieldName === 'subcategoryIds') {
            if (!GeneralHelper.isEmptyOrUndefinedOrNull(field?.value)) {
                // this.resetMaterialsValues()
                const category = this.fields.filter(field => field.name === 'category')[0].value;
                await this.getMaterials(category, field?.value);
            }
        }
    }

    resetSubcategoriesValues() {
        const field = this.fields.filter(field => field.name === 'subcategoryIds')[0];
        field.value = '';
    }

    // resetMaterialsValues() {
    //     const field = this.fields.filter(field => field.name === 'materialIds')[0];
    //     field.value = '';
    // }

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
        this.subcategoryFiltered = this.filterHelper($event, this.subcategories);
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

    async filterProducers($event: AutoCompleteCompleteEvent) {
        this.log.debug('producerFiltered called', $event);
        this.producerFiltered = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.getProducers($event.query)), this.producerLoaderId))?.items;
    }

    //####AUTOCOMPLETE END###############################################################################################################


    matchingDateNgModelChange($event: any) {
        const startDate = $event[0];
        const endDate = $event[1];
        this.fields[4].value = startDate?.toISOString();
        this.fields[5].value = endDate?.toISOString();
    }

    action(item: any, id: string) {

    }
}
