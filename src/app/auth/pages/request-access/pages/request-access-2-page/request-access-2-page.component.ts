import {Component, Inject} from '@angular/core';
import {UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HandleValidatorsHelper} from "../../helpers/handle-validators-helper";
import {NGXLogger} from "ngx-logger";
import {browserRefresh} from "../../../../../app.component";
import {HandleValidatorsRequestAccessHelper} from "../../helpers/handle-validators-request-access-helper";
import {environment} from "../../../../../../environments/environment";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";

@Component({
    selector: 'app-request-access-2-page',
    templateUrl: './request-access-2-page.component.html',
})
export class RequestAccessPage2Component {

    readonly organizationAddress = 'organizationAddress';
    readonly managerName = 'managerName';
    readonly legalRepresentativeName = 'legalRepresentativeName';
    readonly legalRepresentativeTaxIdentificationNumber = 'legalRepresentativeTaxIdentificationNumber';

    readonly indexPage: string = '/auth/request-access/email';
    readonly nextPage: string = '/auth/request-access/steps/3';
    readonly previousPage: string = '/auth/request-access/steps/1';

    constructor(
        private router: Router,
        private log: NGXLogger,
        @Inject('CHECKOUT_FORM_TOKEN') public form: UntypedFormGroup

    ) {}

    async ngOnInit() {
        if (browserRefresh && environment.refresh) {
            this.log.debug('Refreshing browser, navigating to checkout prices.');
            await this.router.navigate([this.indexPage]);
        }

        HandleValidatorsRequestAccessHelper.clearAll(this.form);
        HandleValidatorsHelper.set(this.organizationAddress, this.form, Validators.required);
        HandleValidatorsHelper.set(this.managerName, this.form, Validators.required);
        HandleValidatorsHelper.set(this.legalRepresentativeName, this.form, Validators.required);
        HandleValidatorsHelper.set(this.legalRepresentativeTaxIdentificationNumber, this.form, [Validators.required]);
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

    ngDoCheck(): void {
        console.log(this.form)
    }


}
