import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {LegalRepresentativeFormComponent} from "../legal-representative-form/legal-representative-form.component";
import {LoaderService} from "../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LegalRepresentativeService} from "../../../services/legal-representative.service";
import {LegalRepresentativeResponseDto} from "../../../../../shared/models/legal-representative-response.dto";
import {LegalRepresentativeRequestDto} from "../../../../../shared/models/legal-representative-request.dto";

@Component({
    selector: 'app-legal-representative-create',
    templateUrl: './legal-representative-create.component.html',
    styleUrl: './legal-representative-create.component.scss',
    imports: [
        LegalRepresentativeFormComponent
    ],
    standalone: true
})
export class LegalRepresentativeCreateComponent {

    model: LegalRepresentativeResponseDto;
    serviceMethodLoaderId = 'service-method-loader-id';
    organizationId: string =  this.config.data.organizationId

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public service: LegalRepresentativeService,
        public ref: DynamicDialogRef,
    ) {
    }

    async save($event: LegalRepresentativeRequestDto) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.save(this.organizationId, $event)), this.serviceMethodLoaderId);
        this.message.success();
        this.ref.close('modified');
    }
}
