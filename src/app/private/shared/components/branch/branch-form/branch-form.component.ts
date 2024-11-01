import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {lastValueFrom} from "rxjs";
import {remove as removeDiacritics} from 'diacritics';
import {NGXLogger} from "ngx-logger";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {Page} from "../../../../../shared/objects/page";
import {LoaderService} from "../../../../../shared/services/loader";
import {RegionResponseDto} from "../../../../../shared/models/region-response.dto";
import {RegionService} from "../../../../../shared/services/region/region.service";
import {FocusFirstInvalidFieldModule} from "../../../../../shared/directives/focus-first-invalid-field";
import {FormErrorModule} from "../../../../../shared/components/form-error";
import {AppAutoCompleteModule} from "../../../../../shared/components/autocomplete/app-auto-complete.component";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {BranchRequestDto} from "../../../../../shared/models/branch-request.dto";
import {BranchResponseDto} from "../../../../../shared/models/branch-response.dto";
import {DropdownModule} from "primeng/dropdown";
import {BranchProducerType} from "../../../../../shared/enums/branch-producer-type";
import {NgIf} from '@angular/common';
import {OrganizationTypeEnum} from '../../../../../shared/enums/organization-type.enum';
import {RedAsteriskDirective} from '../../../../../shared/directives/red-asterisk-directive/red-asterisk.directive';

@Component({
    selector: 'app-branch-form',
    templateUrl: './branch-form.component.html',
    styleUrl: './branch-form.component.scss',
    standalone: true,
    imports: [
        FocusFirstInvalidFieldModule,
        ReactiveFormsModule,
        FormErrorModule,
        AppAutoCompleteModule,
        FormsModule,
        DividerModule,
        ButtonModule,
        DropdownModule,
        NgIf,
        RedAsteriskDirective
    ]
})
export class BranchFormComponent {

    form: FormGroup;

    @Output() saveEvent: EventEmitter<BranchRequestDto> = new EventEmitter();
    @Output() closeEvent: EventEmitter<void> = new EventEmitter();

    @Input() model: BranchResponseDto;
    @Input() buttonIsLoading: boolean;

    @Input() isEditing: boolean = false;

    regionInModelPage: Page<RegionResponseDto>;

    // auto complete
    regions: RegionResponseDto[] | [];
    filteredRegions: RegionResponseDto[];
    regionValue: any;

    cityValue: any;
    cities: any[] | undefined;
    filteredCities: any[];

    loaderId: string = 'this.service.regions()';

    types: any[] = [
        {
            value: 'Miembro',
            key: 'MEMBER'
        },
        {
            value: 'Moderador',
            key: 'MODERATOR'
        }
    ];

    @Input()
    organizationType : string;

    branchProducerTypes = GeneralHelper.enumToList(BranchProducerType);

    constructor(
        public loaderService: LoaderService,
        private regionService: RegionService,
        private log: NGXLogger,
        private fb: FormBuilder) {}

    async ngOnInit() {
        this.cityValue = this.model?.city;
        this.regionValue = this.model?.state;



        this.form = this.fb.group({
            code: [this.model?.code,       [Validators.required, Validators.maxLength(255)]],
            address: [this.model?.address, [Validators.required, Validators.maxLength(255)]],
            producerType: [
                {
                    value:  this.model?.producerType || GeneralHelper.getKeyByValue(BranchProducerType ,BranchProducerType.PRODUCER),
                    disabled: this.isEditing
                },
                [Validators.required]
            ],
            city: [ this.cityValue,        [Validators.required, Validators.maxLength(255)]],
            state: [this.regionValue,      [Validators.required, Validators.maxLength(255)]]
        });

        // auto complete
        try {
            this.regionInModelPage = await this.loaderService.activateLoader<Page<RegionResponseDto>>(() => lastValueFrom(this.regionService.regions()), this.loaderId);
        } catch (e) {
            this.log.info(e)
        }

        this.regions = this.regionInModelPage?.items || [];
        this.cities = this.regionInModelPage?.items.flatMap(value => value.cities) || [];
    }

    markAllAsTouched(form: FormGroup): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }

    save() {
        this.saveEvent.emit(this.form.getRawValue());
    }

    filterCity(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = removeDiacritics(event.query.toLowerCase()); // Remove accents from the query
        for (let i = 0; i < (this.cities as any[]).length; i++) {
            let city = (this.cities as any[])[i];
            let cityName = removeDiacritics(city.name.toLowerCase()); // Remove accents from city name
            if (cityName.indexOf(query) === 0) {
                filtered.push(city);
            }
        }
        this.filteredCities = filtered;
    }

    filterRegion(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = removeDiacritics(event.query.toLowerCase()); // Remove accents from the query
        for (let i = 0; i < (this.regions as any[]).length; i++) {
            let region = (this.regions as any[])[i];
            let cityName = removeDiacritics(region.name.toLowerCase()); // Remove accents from region name
            if (cityName.indexOf(query) === 0) {
                filtered.push(region);
            }
        }
        this.filteredRegions = filtered;
    }

    cityNgModelChange($event: any) {
        const value = $event.name ? $event.name : $event
        this.form.controls['city'].setValue(value);
    }

    regionNgModelChange($event: any) {
        const value = $event.name ? $event.name : $event
        this.form.controls['state'].setValue(value);
    }

    protected readonly OrganizationType = OrganizationTypeEnum;
}
