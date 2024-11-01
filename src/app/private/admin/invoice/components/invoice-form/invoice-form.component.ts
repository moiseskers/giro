import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {InvoiceRequestDtoForm} from '../../../../../shared/form-models/invoice-request-dto.form';
import {InvoiceRequestDto} from '../../../../../shared/models/invoice-request.dto';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';
import {LoaderService} from '../../../../../shared/services/loader';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {remove as removeDiacritics} from 'diacritics';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {Page} from '../../../../../shared/objects/page';
import {RegionResponseDto} from '../../../../../shared/models/region-response.dto';
import {lastValueFrom} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
import {RegionService} from '../../../../../shared/services/region/region.service';
import {GiroFile} from '../../../../../shared/objects/giro-file';
import {InvoiceResponseDto} from '../../../../../shared/models/invoice-response.dto';
import {AdminInvoiceService} from '../../services/admin-invoice.service';
import {InvoiceItemResponseDto} from '../../../../../shared/models/invoice-item-response.dto';
import {OrganizationResponseDto} from '../../../../../shared/models/organization-response.dto';
import {InvoiceReadFileResponseDto} from '../../../../../shared/models/invoice-read-file-response.dto';
import moment from 'moment';
import {DocumentRequestDto} from '../../../../../shared/models/document-request.dto';

@Component({
    selector: 'app-invoice-form',
    templateUrl: './invoice-form.component.html',
    styleUrl: './invoice-form.component.scss'
})
export class InvoiceFormComponent {

    form: FormGroup<InvoiceRequestDtoForm>;

    @Input() model: InvoiceResponseDto;
    @Input() saveLoader: boolean = false;

    @Input() isEditing: boolean = false;

    @Output() saveEvent: EventEmitter<InvoiceRequestDto> = new EventEmitter();

    cityValue: any;
    cityLoaderId = UuidHelper.get();
    regionLoaderId = UuidHelper.get();

    filteredCities: any[];
    cities: any = [];

    regionInModelPage: Page<RegionResponseDto>;

    regions: RegionResponseDto[];
    documentValue: string;
    issuerRutValue: string;
    receiverRutValue: string;

    constructor(
        private cdr: ChangeDetectorRef,
        public dynamicDialogRef: DynamicDialogRef,
        private regionService: RegionService,
        private log: NGXLogger,
        public loaderService: LoaderService,
        private invoiceService: AdminInvoiceService,
    ) {}

    get retainedIVA(): number {
        const items = this.form.controls.items.value;
        return this._retainedIVA(items);
    }

    ngAfterViewInit() {
        this.cdr.detectChanges();
    }
    //####ANGULAR CYCLES END###############################################################################################################

    save() {
        const model = this.form.getRawValue();

        if (model?.items === null || model?.items.length === 0) {
            throw new Error('Al menos una fila debe ser agregada.!')
        }

        this.log.debug('save called', model);
        this.saveEvent.emit(model);
    }

    cityNgModelChange($event: any) {
        const value = $event.name ? $event.name : $event;
        this.log.debug('cityNgModelChange called', value);
        this.form.controls.city.setValue(value);
    }

    filterCity(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = removeDiacritics(event.query.toLowerCase()); // Remove accents from the query
        this.log.debug('filterCity called', query);
        for (let i = 0; i < (this.cities as any[]).length; i++) {
            let city = (this.cities as any[])[i];
            let cityName = removeDiacritics(city.name.toLowerCase()); // Remove accents from city name
            if (cityName.indexOf(query) === 0) {
                filtered.push(city);
            }
        }
        this.filteredCities = filtered;
    }

    markAllAsTouched(form: any, issuerRutNgModelChangeRef: NgModel, receiverRutNgModelChangeRef: NgModel, cityNgModelChangeRef: NgModel): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
        this.markAllAsTouchedNgFormHelper(issuerRutNgModelChangeRef?.control, receiverRutNgModelChangeRef?.control, form.controls.document, cityNgModelChangeRef.control);
    }

    markAllAsTouchedNgFormHelper(...controls: FormControl[]) {
        controls.forEach(control => {
            control.markAllAsTouched();
            control.markAsDirty();
        });
    }

    async autoCompleteHelper() {
        // auto complete
        this.log.debug('autoCompleteHelper called');
        try {
            this.regionInModelPage = await this.loaderService.activateLoader<Page<RegionResponseDto>>(() => lastValueFrom(this.regionService.regions()), this.regionLoaderId);
            this.log.debug('autoCompleteHelper succeeded', this.regionInModelPage);
        } catch (e) {
            this.log.error('autoCompleteHelper failed', e);
        }
        this.regions = this.regionInModelPage?.items || [];
        this.cities = this.regionInModelPage?.items.flatMap(value => value.cities) || [];
    }

    async documentNgModelChange($event: GiroFile[]) {
        let documentOutModel: DocumentRequestDto = null;
        if ($event?.length > 0) {
            documentOutModel = {
                name: $event[0].name,
                file: $event[0].file,
                contentType: $event[0].contentType
            }
            this.log.debug('documentNgModelChange called', $event);
            if ($event[0]?.file && $event[0]?.contentType === 'text/xml') {
                await this.fromDocumentSetValuesHelper($event[0]?.file);
            }
        }
        this.form.controls.document.setValue(documentOutModel);
    }

    get iva(): number {
       return this.form.controls.netValue.value * 0.19;
    }

    get total(): number {
        const items = this.form.controls.items.value;
        return items?.map((value: InvoiceItemResponseDto) => value?.totalAmount || 0).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
    }

    _retainedIVA(items: InvoiceItemResponseDto[]): number {
        return items?.map((value: InvoiceItemResponseDto) => value?.withholdingTaxes || 0).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
    }

    //####ANGULAR CYCLES START###############################################################################################################
    async ngOnInit() {
        this.log.debug('ngOnInit called model', this.model);

        this.form = new FormGroup<InvoiceRequestDtoForm>({
            issuerId: new FormControl<string>(this.model?.issuerId, [Validators.required]),
            receiverId: new FormControl<string>(this.model?.receiverId, [Validators.required]),
            issueDate: new FormControl<Date | string | null>(this.model?.issueDate ? new Date(this.model?.issueDate) : null, [Validators.required]),
            invoiceNumber: new FormControl<string>(this.model?.invoiceNumber, [Validators.required]),
            economicActivities: new FormControl<string>(this.model?.economicActivities, [Validators.required]),
            address: new FormControl<string>(this.model?.address, [Validators.required]),
            city: new FormControl<string>(this.model?.city, [Validators.required]),
            currency: new FormControl<string>(this.model?.currency || 'CLP'),
            netValue: new FormControl<number | null>(this.model?.netValue, [Validators.required]),

            items: new FormControl<any>(this.model?.items),

            document: new FormControl<DocumentRequestDto>({
                value:  this.model?.document,
                disabled: !!this.model?.document,
            }, {
                validators: !this.isEditing ? Validators.required : null
            }),

            // Not being sent
            issuer: new FormControl<string>({
                value: this.model?.issuer?.businessName,
                disabled: true,
            }),
            receiver: new FormControl<string | null>(
                {
                    value: this.model?.receiver?.businessName,
                    disabled: true,
                }
            ),
            retainedIVA: new FormControl<number | null>(0),
            total: new FormControl<number | null>(0),
            iva: new FormControl<number | null>(0),
        });

        if (this.isEditing) {
            this.cityValue = this.form?.controls?.city?.value;
            this.issuerRutValue = this?.model?.issuer?.taxIdentificationNumber;
            this.receiverRutValue = this?.model?.receiver?.taxIdentificationNumber;
        }

        await this.autoCompleteHelper();
    }

    quantity(items: InvoiceItemResponseDto[]): number {
        return items?.map(value => value?.quantity || 0).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
    }

    async issuerRutNgModelChange($event: any, issuerRutNgModelChangeRef: NgModel) {
        await this._rutNgModelChange($event,  issuerRutNgModelChangeRef, this.form.controls.issuerId, this.form.controls.issuer)
    }

    async _rutNgModelChange($event: string, ref:NgModel, rutFormControl: FormControl, issuerBearerFormControl: FormControl ) {
        let model: OrganizationResponseDto;
        if (ref.valid) {
            try {
                model = await lastValueFrom(this.invoiceService.findByTaxIdentificationNumber($event));
                rutFormControl.setValue(model.id,{ emitEvent: false });
            }catch (e) {
                ref.control.setErrors({ rutNotFound: true });
            }
        } else {
            rutFormControl.setValue(null);
        }

        issuerBearerFormControl.setValue(model?.businessName);
    }

    async fromDocumentSetValuesHelper(file: string) {
        try {
            const response  = await lastValueFrom(this.invoiceService.readFile(file));
            this._fromDocumentSetValuesHelper(
                response
            );
        } catch (e) {
            this.log.info(e)
        }
    }

    _fromDocumentSetValuesHelper(
        invoiceReadFileResponseDto: InvoiceReadFileResponseDto
    ) {
        this.form.controls.issuerId.setValue(invoiceReadFileResponseDto?.issuerId,{ emitEvent: false });
        this.issuerRutValue = invoiceReadFileResponseDto?.issuerTaxIdentificationNumber;
        this.form.controls.issuer.setValue(invoiceReadFileResponseDto?.issuerName,{ emitEvent: false });
        this.form.controls.receiverId.setValue(invoiceReadFileResponseDto?.receiverId,{ emitEvent: false });
        this.form.controls.receiver.setValue(invoiceReadFileResponseDto?.receiverName,{ emitEvent: false });
        this.receiverRutValue = invoiceReadFileResponseDto?.receiverTaxIdentificationNumber;
        this.form.controls.invoiceNumber.setValue(invoiceReadFileResponseDto?.invoiceNumber,{ emitEvent: false });
        this.form.controls.issueDate.setValue(moment(invoiceReadFileResponseDto?.issueDate)?.toDate() ,{ emitEvent: false });
        this.form.controls.economicActivities.setValue(invoiceReadFileResponseDto?.economicActivities,{ emitEvent: false });
        this.form.controls.address.setValue(invoiceReadFileResponseDto?.address,{ emitEvent: false });
        this.form.controls.city.setValue(invoiceReadFileResponseDto?.city,{ emitEvent: false });
        this.form.controls.netValue.setValue(invoiceReadFileResponseDto?.netValue,{ emitEvent: false });
        this.cityValue = invoiceReadFileResponseDto?.city;

        const items: InvoiceItemResponseDto[] = invoiceReadFileResponseDto.items.map(value => {
            return {
                code:value.code,
                description: value.description,
                quantity: value.quantity,
                netValue: value.netValue,
                withholdingTaxes: 0,
            }
        });

        this.form.controls.items.setValue(items,{ emitEvent: false });
    }

    async receiverRutNgModelChange($event: any, receiverRutNgModelChangeRef: NgModel) {
        await this._rutNgModelChange($event,  receiverRutNgModelChangeRef, this.form.controls.receiverId, this.form.controls.receiver);
    }
}
