import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {remove as removeDiacritics} from 'diacritics';
import {OrganizationResponseDto} from "../../../../../../shared/models/organization-response.dto";
import {Page} from "../../../../../../shared/objects/page";
import {lastValueFrom} from "rxjs";
import {LoaderService} from "../../../../../../shared/services/loader";
import {UuidHelper} from "../../../../../../shared/helpers/uuid-helper";
import {NGXLogger} from "ngx-logger";
import {GeneralHelper} from "../../../../../../shared/helpers/general-helper";
import {OrganizationService} from "../../../../../shared/services/organization.service";
import {ManagerResponseDto} from '../../../../../../shared/models/manager-response.dto';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

    form: FormGroup;

    @Output() saveEvent: EventEmitter<ManagerResponseDto> = new EventEmitter();
    @Output() closeEvent: EventEmitter<void> = new EventEmitter();

    @Input() model: ManagerResponseDto;
    @Input() buttonIsLoading: boolean;

    @Input() organizationIdAutoCompleteValue: string;
    @Input() isEditing: boolean;

    organizations: OrganizationResponseDto[] | [];
    filteredOrganizations: OrganizationResponseDto[];

    public readonly serviceGetOrganizationQueryLoaderId: string = UuidHelper.get()

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

    constructor(private fb: FormBuilder,
                private log: NGXLogger,
                private organizationService: OrganizationService,
                public loaderService: LoaderService) {
    }

    async ngOnInit() {
        this.form = this.fb.group({
            organizationId: [this.model?.organization.id],
            name: [this.model?.name, [Validators.required, Validators.maxLength(150)]],
            email: [this.model?.email, [Validators.required, Validators.email, Validators.maxLength(255)]],
            phone: [this.model?.phone, [Validators.maxLength(20)]],
            role: [this.model?.role, Validators.required],
            responsibility: [this.model?.responsibility, Validators.required],
        });

        if (this.isEditing) {
            this.form.controls['email'].disable();
        }
    }

    markAllAsTouched(form: FormGroup): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }

    save() {
        this.log.info(this.form.getRawValue())
        this.saveEvent.emit(this.form.getRawValue());
    }

    async filter(event: AutoCompleteCompleteEvent) {
        let query: string = removeDiacritics(event.query.toLowerCase()); // Remove accents from the query
        const model = await this.loaderService.activateLoader<Page<OrganizationResponseDto>>(() => lastValueFrom(this.organizationService.getByStatusActive(query)), this.serviceGetOrganizationQueryLoaderId);
        this.filteredOrganizations = model.items;
    }

    ngModelChange($event: any) {
        const value = $event?.id ? $event?.id : $event
        this.form.controls['organizationId'].setValue(value);
    }
}
