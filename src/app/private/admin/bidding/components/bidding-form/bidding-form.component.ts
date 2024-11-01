import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgModel, Validators} from "@angular/forms";
import {NGXLogger} from "ngx-logger";
import {DropdownChangeEvent} from "primeng/dropdown";
import {BiddingRequestDto} from "../../../../../shared/models/bidding-request.dto";
import {BiddingResponseDto} from "../../../../../shared/models/bidding-response.dto";
import {BiddingType} from "../../../../../shared/enums/bidding-type.enum";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {remove as removeDiacritics} from 'diacritics';
import {distinctUntilChanged, filter, lastValueFrom, tap, timer} from "rxjs";
import {UuidHelper} from 'src/app/shared/helpers/uuid-helper';
import {BiddingService} from "../../../../shared/services/bidding.service";
import {PopulationServedResponseDto} from "../../../../../shared/models/population-served-response.dto";
import {switchMap} from "rxjs/operators";
import moment from "moment";
import {HandleValidatorsHelper} from "../../../../../auth/pages/request-access/helpers/handle-validators-helper";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {Page} from "../../../../../shared/objects/page";
import {LoaderService} from "../../../../../shared/services/loader";
import {RegionService} from "../../../../../shared/services/region/region.service";
import {RegionResponseDto} from "../../../../../shared/models/region-response.dto";

@Component({
    selector: 'app-bidding-form',
    templateUrl: './bidding-form.component.html',
    styleUrl: './bidding-form.component.scss'
})
export class BiddingFormComponent {

    form: FormGroup;

    @Input()
    model: BiddingResponseDto;

    @Output() saveEvent: EventEmitter<BiddingRequestDto> = new EventEmitter();

    @Input()
    isEditing: boolean = false;

    @Input()
    buttonIsLoading: boolean;

    @Output() closeEvent: EventEmitter<void> = new EventEmitter();

    // drop down population
    public readonly populationServedLoaderId: string = UuidHelper.get()
    populationServedArray: PopulationServedResponseDto[];

    // auto complete
    public readonly regionLoaderId: string = UuidHelper.get()
    regionInModelPage: Page<RegionResponseDto>;
    regions: RegionResponseDto[] | [];
    filteredRegions: RegionResponseDto[];
    regionValue: any;

    cityValue: any;
    cities: any[] | undefined;
    filteredCities: any[];

    // today = new Date();
    // [minDate]="today"

    @ViewChild('regionNgModelChangeRef') regionNgModelChangeRef: NgModel;
    @ViewChild('cityNgModelChangeRef') cityNgModelChangeRef: NgModel;
    biddingTypes = GeneralHelper.enumToList(BiddingType, 'key', 'value');
    biddingType = BiddingType;
    pcEfficiencyDisplay: boolean = true;

    constructor(private fb: FormBuilder,
                public loaderService: LoaderService,
                private regionService: RegionService,
                private service: BiddingService,
                private log: NGXLogger
    ) {}

    async ngOnInit() {
        const biddingType = this.isEditing ? this.model.biddingType : GeneralHelper.getKeyByValue(BiddingType, BiddingType.PICKUP);

        this.form = this.fb.group({
            idBali: [this.model?.idBali],
            biddingType: [biddingType],

            initialDate: [this.getDate(this.model?.initialDate)],
            finalDate: [this.getDate(this.model?.finalDate)],

            finalLimit: [this.model?.finalLimit],
            description: [this.model?.description],
            observation: [this.model?.observation],
            regionName: [this.model?.regionName],
            cityName: [this.model?.cityName],
            routeFrequency: [this.model?.routeFrequency],
            populationServedId: [this.model?.populationServedId],
            pcEfficiency: [this.model?.pcEfficiency],
            materials: [this.model?.materials],
            createdAt: [this.model?.createdAt],
            documents: [[]],// Assuming you have a FormArray for documents

            formLink: [this.model?.formLink],
        });

        this.form.controls['finalDate'].disable();
        this.form.controls['idBali'].disable();

        if (!this.isEditing) {
            this.startUp(BiddingType.PICKUP);
        }

        if (this.isEditing) {
            this.regionValue = this.model.regionName;
            this.cityValue = this.model.cityName;
            this.startUp(BiddingType[this.model.biddingType]);
        }

        await this.autoCompleteHelper();
        await this.populationServedHandler();

        this.formControlsBiddingTypeValueChanges();
        this.formControlsFinalLimitValueHandler();
    }

    organizationTypeOnChange($event: DropdownChangeEvent): void {
        this.startUp(BiddingType[$event.value]);
        this.formControlsFinalLimitValueHandler();
    }

    save(): void {
        this.log.info(`[${this.constructor.name}]`, 'Saving form data:', this.form.getRawValue());
        this.saveEvent.emit(this.form.getRawValue());
    }

    startUp(type: BiddingType): void {
        this.clearValidationStates();
        switch (type) {
            case BiddingType.PICKUP:
                this.commonsValidations();
                this.pickupValidations();
                break
            case BiddingType.OPERATION_IRA:
                this.commonsValidations();
                break
            case BiddingType.PRETREATMENT:
                this.commonsValidations();
                this.pretreatmentValidations();
                break;
            case BiddingType.VALORIZATION:
                this.commonsValidations();
                this.valorizationValidations();
                break;
        }

        this.form.controls['initialDate'].valueChanges.subscribe(v => {
            this.form.controls['finalLimit'].reset();
            this.form.controls['finalDate'].reset();
        });
    }

    commonsValidations(): void {
        HandleValidatorsHelper.set('biddingType', this.form, Validators.required);
        HandleValidatorsHelper.set('regionName', this.form, Validators.required);
        HandleValidatorsHelper.set('cityName', this.form, Validators.required);
        HandleValidatorsHelper.set('observation', this.form);

        HandleValidatorsHelper.set('initialDate', this.form, [Validators.required]);
        HandleValidatorsHelper.set('finalLimit', this.form, Validators.required);
    }

    pickupValidations(): void {
        HandleValidatorsHelper.set('routeFrequency', this.form, Validators.required);
        HandleValidatorsHelper.set('pcEfficiency', this.form, [Validators.required, Validators.min(0), Validators.max(100)]);
        HandleValidatorsHelper.set('populationServedId', this.form, Validators.required);
    }

    pretreatmentValidations(): void {
        HandleValidatorsHelper.set('pcEfficiency', this.form, [Validators.required, Validators.min(0), Validators.max(100)]);
    }

    valorizationValidations(): void {
        HandleValidatorsHelper.set('materials', this.form, Validators.required);
    }

    clearValidationStates(): void {
        GeneralHelper.formClearValidationStatesOrganization(this.form);
    }

    markAllAsTouched(form: any): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
        this.regionNgModelChangeRef.control.markAsTouched();
        this.cityNgModelChangeRef.control.markAsTouched();
    }

    async autoCompleteHelper() {
        // auto complete
        try {
            this.regionInModelPage = await this.loaderService.activateLoader<Page<RegionResponseDto>>(() => lastValueFrom(this.regionService.regions()), this.regionLoaderId);
        } catch (e) {
            this.log.info(e)
        }
        this.regions = this.regionInModelPage?.items || [];
        this.cities = this.regionInModelPage?.items.flatMap(value => value.cities) || [];
    }

    filterCity(event: AutoCompleteCompleteEvent): void {
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
        const value = $event?.name ? $event.name : $event
        this.form.controls['cityName'].setValue(value);
    }

    regionNgModelChange($event: any) {
        const value = $event?.name ? $event.name : $event
        this.form.controls['regionName'].setValue(value);
    }

    getDate(dateString: string): Date {

        // Attempt to create a new Date object with the provided argument
        const dateObject = moment(dateString).toDate();

        // Check if the created date object is valid
        // Invalid dates will return 'Invalid Date' when converted to string
        if (dateObject.toString() !== 'Invalid Date') {
            return dateObject; // Return the valid date object
        } else {
            return null; // Return null for invalid dates
        }
    }

    private async populationServedHandler() {
        this.populationServedArray = (await this.loaderService.activateLoader<Page<PopulationServedResponseDto>>(() => lastValueFrom(this.service.populationServed()), this.populationServedLoaderId)).items;

        if (this.isEditing) {
            this.form.controls['populationServedId'].setValue(this.model.populationServedId);
        } else {
            this.form.controls['populationServedId'].setValue(this.populationServedArray[0].id);
        }

    }

    private formControlsBiddingTypeValueChanges() {
        this.form.controls['biddingType'].valueChanges.pipe(
            distinctUntilChanged(), // Only emit distinct values
            tap(() => this.pcEfficiencyDisplay = false), // Hide the element while the value is changing
            switchMap(() => timer(500)), // Wait for 1 second after the last value change
            tap(() => this.pcEfficiencyDisplay = true), // Show the element after the timeout
        ).subscribe();
    }

    private formControlsFinalLimitValueChanges(): void {
        this.form.controls['finalLimit'].valueChanges
            .pipe(filter(value => value != null && value != ''))
            .subscribe(finalLimit => {
                const initialDate = this.form.controls['initialDate'].value;

                const originalDate = moment(initialDate);
                const newDate = originalDate.add(finalLimit, 'days').toDate();
                this.form.controls['finalDate'].setValue(newDate, {eventEmit: false});
            });
    }

    private formControlsFinalLimitValueHandler() {
        this.formControlsFinalLimitValueChanges();
        // this.form.controls['finalLimit'].setValue(null);
        // this.form.controls['finalDate'].setValue(null);
    }
}
