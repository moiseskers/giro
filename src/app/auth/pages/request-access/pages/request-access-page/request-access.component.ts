import {Component, forwardRef} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrl: './request-access.component.scss',
  providers: [{
    provide: 'CHECKOUT_FORM_TOKEN',
    useFactory: (layoutComponent: { form: UntypedFormGroup; }) => layoutComponent.form,
    deps: [forwardRef(() => RequestAccessComponent)],
  }],
})
export class RequestAccessComponent {

  form: UntypedFormGroup;

  constructor(private fb: FormBuilder,
              private log: NGXLogger
  ) {

    this.log.info('Initializing RequestAccessComponent'); // Log initialization of component

    // no validators are placed here, they are placed when the component that is going to be using it, it started
    this.form = this.fb.group({
      email: [''],

      // company manager
      organizationTaxIdentificationNumber: [''],
      organizationTradeName: [''],
      organizationBusinessName: [''],

      // company
      organizationAddress: [''],
      managerName: [''],
      legalRepresentativeName: [''],
      legalRepresentativeTaxIdentificationNumber: [''],

      // documentation
      documents: [[]],
    });

    // Log form initialization completion
    this.log.info('RequestAccessComponent initialized with form:', this.form.value);
  }

}
