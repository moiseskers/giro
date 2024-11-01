import {Component} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ActivatedRoute} from "@angular/router";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {LoaderService} from "../../../../../shared/services/loader";

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrl: './user-view.component.scss'
})
export class UserViewComponent {

    ref: DynamicDialogRef | undefined;
    id: string = this.activatedRoute.snapshot.params['id'];
    organization: OrganizationResponseDto;
    loaderId = 'service-update-status-approve'

    constructor(
        public loaderService: LoaderService, private activatedRoute: ActivatedRoute) {
    }

}
