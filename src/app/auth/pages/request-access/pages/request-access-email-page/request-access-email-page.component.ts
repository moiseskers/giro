import {Component, Inject} from '@angular/core';
import {UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {HandleValidatorsHelper} from "../../helpers/handle-validators-helper";
import {HandleValidatorsRequestAccessHelper} from "../../helpers/handle-validators-request-access-helper";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {GiroValidators} from "../../../../../shared/validators/giro-validators";

@Component({
    selector: 'app-request-access-email-page',
    templateUrl: './request-access-email-page.component.html',
})
export class RequestAccessPageEmailComponent {

    readonly nextPage: string = '/auth/request-access/steps/1';

    items: any = [
        {
            label: 'Personal',
            routerLink: 'personal'
        },
        {
            label: 'Seat',
            routerLink: 'seat'
        },
        {
            label: 'Payment',
            routerLink: 'payment'
        }
    ];

    constructor(
        private router: Router,
        private service: ApiService,
        @Inject('CHECKOUT_FORM_TOKEN') public form: UntypedFormGroup
    ) {
    }

    ngOnInit(): void {
        HandleValidatorsRequestAccessHelper.clearAll(this.form);
        HandleValidatorsHelper.set('email', this.form, [Validators.required, Validators.email], GiroValidators.email(this.service));
    }

    async save() {
        await this.router.navigate([this.nextPage])
    }

    markAllAsTouched(form: any): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }

}
