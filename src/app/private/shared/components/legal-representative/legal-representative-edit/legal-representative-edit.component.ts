import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {LegalRepresentativeFormComponent} from "../legal-representative-form/legal-representative-form.component";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../shared/services/loader";
import {LegalRepresentativeRequestDto} from "../../../../../shared/models/legal-representative-request.dto";
import {LegalRepresentativeService} from "../../../services/legal-representative.service";
import {LegalRepresentativeResponseDto} from "../../../../../shared/models/legal-representative-response.dto";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";

@Component({
    selector: 'app-legal-representative-edit',
    templateUrl: './legal-representative-edit.component.html',
    styleUrl: './legal-representative-edit.component.scss',
    standalone: true,
    imports: [
        LegalRepresentativeFormComponent
    ]
})
export class LegalRepresentativeEditComponent {

    id: string;
    organizationId: string;
    serviceMethodLoaderId = UuidHelper.get();
    model: LegalRepresentativeResponseDto;

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public service: LegalRepresentativeService,
        public ref: DynamicDialogRef,
    ) {
    }

    ngOnInit(): void {
        this.organizationId = this.config.data.organizationId;
        this.id = this.config.data.id;
        this.model = this.config.data.model;
    }

    async save($event: LegalRepresentativeRequestDto) {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.update(this.organizationId, this.id, $event)), this.serviceMethodLoaderId);
        this.message.success();
        this.ref.close('modified');
    }

}
