import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NGXLogger} from "ngx-logger";
import {LeadsService} from '../../../../shared/services/leads.service';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {LeadsResponseDto} from '../../../../../shared/models/leads-response.dto';
import {lastValueFrom} from 'rxjs';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {MatchingRequestDtoForm} from '../../../../../shared/form-models/matching-request-dto.form';
import {MatchingType} from '../../../../../shared/types/matching.type';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';
import {MatchingRequestDto} from '../../../../../shared/models/./matching-request.dto';

@Component({
    selector: 'app-form-modal-matching',
    templateUrl: './matching-form.component.html',
    styleUrl: './matching-form.component.scss'
})
export class MatchingFormComponent {

    readonly categoriesLoaderId: string = UuidHelper.get();

    form: FormGroup<MatchingRequestDtoForm>;

    @Output() saveEvent: EventEmitter<MatchingRequestDto> = new EventEmitter();

    @Input() buttonIsLoading: boolean;
    @Input() type!: MatchingType;

    categories: LeadsResponseDto[] = [];
    matchingDate: any;

    constructor(private fb: FormBuilder,
                private log: NGXLogger,
                private leadsService: LeadsService,
                private loaderService: LoaderServiceV2,
                ) {}

    async ngOnInit() {
        this.form = this.fb.group({
            type: new FormControl<MatchingType>(this.type, [Validators.required]),
            category: new FormControl<string>(null, [Validators.required]),
            complianceYear: new FormControl<string | Date>(null, [Validators.required]),
        })
        this.categories = (await this.loaderService.activateLoader(() => lastValueFrom(this.leadsService.categories()), this.categoriesLoaderId)).items;
    }

    save() {
        const form: MatchingRequestDto  = this.form.getRawValue();
        this.log.info('MatchingRequestDto ', form)
        this.saveEvent.emit(form);
    }

    matchingDateNgModelChange($event: Date) {
        this.form.controls.complianceYear.setValue($event?.getFullYear()?.toString())
    }

    markAllAsTouched(form: FormGroup<MatchingRequestDtoForm>): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }
}
