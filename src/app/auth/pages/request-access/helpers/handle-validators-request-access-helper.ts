import {HandleValidatorsHelper} from "./handle-validators-helper";
import {FormGroup} from "@angular/forms";

export class HandleValidatorsRequestAccessHelper {

    public static fields: string[] = ['email',
        'organizationTaxIdentificationNumber',
        'organizationTradeName',
        'organizationBusinessName',
        'organizationAddress',
        'managerName',
        'legalRepresentativeName',
        'legalRepresentativeTaxIdentificationNumber',
        'documents'];

    public static clearAll(form: FormGroup) {
        HandleValidatorsRequestAccessHelper.fields.forEach(field => {
            HandleValidatorsHelper.clear(field, form);
        });
    }

}
