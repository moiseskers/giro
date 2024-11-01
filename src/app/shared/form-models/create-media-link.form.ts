import {AllowedOrganizationTypes} from '../types/allowed-organization.types';
import {FormControl} from '@angular/forms';

export interface CreateMediaLinkForm {
    url: FormControl<string>;
    allowedOrganizationTypes: FormControl<AllowedOrganizationTypes[]>;
}


