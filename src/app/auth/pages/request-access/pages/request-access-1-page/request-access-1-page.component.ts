import {Component, Inject} from '@angular/core';
import {UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HandleValidatorsHelper} from "../../helpers/handle-validators-helper";
import {NGXLogger} from "ngx-logger";
import {ApiService} from "../../services/api.service";
import {browserRefresh} from "../../../../../app.component";
import {HandleValidatorsRequestAccessHelper} from "../../helpers/handle-validators-request-access-helper";
import {environment} from "../../../../../../environments/environment";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {GiroValidators} from "../../../../../shared/validators/giro-validators";

@Component({
    selector: 'app-request-access-1-page',
    templateUrl: './request-access-1-page.component.html',
})
export class RequestAccessPage1Component {

    readonly organizationTaxIdentificationNumber: string = 'organizationTaxIdentificationNumber';
    readonly organizationTradeName: string = 'organizationTradeName';
    readonly organizationBusinessName: string = 'organizationBusinessName';

    readonly indexPage: string = '/auth/request-access/email';
    readonly nextPage: string = '/auth/request-access/steps/2';
    readonly previousPage: string = this.indexPage;

    constructor(
        private router: Router,
        private log: NGXLogger,
        private service: ApiService,
        @Inject('CHECKOUT_FORM_TOKEN') public form: UntypedFormGroup
    ) {}

    async ngOnInit() {
        if (browserRefresh && environment.refresh) {
            this.log.debug('Refreshing browser, navigating to checkout prices.');
            await this.router.navigate([this.indexPage]);
        }

        HandleValidatorsRequestAccessHelper.clearAll(this.form);

        HandleValidatorsHelper.set(this.organizationTaxIdentificationNumber, this.form,
            [Validators.required], GiroValidators.checkIfIdentityExists(this.service)
        );
        HandleValidatorsHelper.set(this.organizationTradeName, this.form, Validators.required);
        HandleValidatorsHelper.set(this.organizationBusinessName, this.form, Validators.required);
    }

    async save() {
        await this.router.navigate([this.nextPage])
    }

    async previous() {
        await this.router.navigate([this.previousPage])
    }

    markAllAsTouched(form: any): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }


}
