import {AllowedOrganizationTypes} from '../types/allowed-organization.types';
import {FormControl} from '@angular/forms';
import {GiroFile} from '../objects/giro-file';

export interface MaterialDocumentRequestForm {
    file: FormControl<GiroFile[]>;
    allowedOrganizationTypes: FormControl<AllowedOrganizationTypes[]>;
}
