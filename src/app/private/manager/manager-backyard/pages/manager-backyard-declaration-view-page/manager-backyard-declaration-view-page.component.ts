import {Component} from '@angular/core';
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../../../shared/services/loader";
import {NGXLogger} from "ngx-logger";
import {OrganizationService} from "../../../../shared/services/organization.service";
import {BreadcrumbService} from "../../../../../shared/services/breadcrumb";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {lastValueFrom} from "rxjs";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationType} from "../../../../../shared/enums/declaration-type";
import {DeclarationService} from "../../../../shared/services/declaration.service";
import {ProfileService} from "../../../../../shared/services/auth/profile.service";
import {DeclarationRequestStatus} from "../../../../../shared/enums/declaration-request-status";
import {Role} from "../../../../../shared/enums/role";
import moment from "moment";

@Component({
    selector: 'app-manager-backyard-declaration-view-page',
    templateUrl: './manager-backyard-declaration-view-page.component.html',
    styleUrl: './manager-backyard-declaration-view-page.component.scss',
    providers: [TitleCasePipe]
})
export class ManagerBackyardDeclarationViewPageComponent {

    model: DeclarationResponseDto
    loaderId = UuidHelper.get();
    id: string = this.activatedRoute.snapshot.params['id'];

    public organization: OrganizationResponseDto;
    DeclarationStatus = DeclarationStatus
    public organizationId: string;
    protected readonly DeclarationType = DeclarationType;

    constructor(
        private activatedRoute: ActivatedRoute,
        public loaderService: LoaderService,
        private log: NGXLogger,
        private organizationService: OrganizationService,
        private breadcrumbService: BreadcrumbService,
        private profileService: ProfileService,
        private datePipe: DatePipe,
        private titleCasePipe: TitleCasePipe,
        private service: DeclarationService) {
    }

    public modelIn = (model: DeclarationResponseDto) => model;

    async ngOnInit() {
        this.organizationId = this.profileService.getProfile().organizations[0].id;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.byId(this.organizationId, this.id)), this.loaderId);
        this.organization = await lastValueFrom(this.organizationService.getById(this.organizationId));
        this.log.info(this.model);
        this.updateBreadcrumbByUrl(moment(this.model.declarationRequest.declaredMonthYear).toDate(), this.model.declarationRequest.recurrence)
    }

    updateBreadcrumbByUrl(declaredMonthYear: Date | null, type: string) {
        let date: string;
        if (DeclarationRequestRecurrence[type] === DeclarationRequestRecurrence.MONTHLY) {
            date = this.titleCasePipe.transform(this.datePipe.transform(declaredMonthYear, 'MMMM yyyy'));
        } else {
            date = this.datePipe.transform(declaredMonthYear, 'yyyy');
        }
        this.breadcrumbService.updateBreadcrumbByUrl(`${location.pathname}`, date);
    }

    protected readonly DeclarationRequestStatus = DeclarationRequestStatus;
    protected readonly Roles = Role;
}
