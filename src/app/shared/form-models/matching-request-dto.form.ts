import {FormControl} from "@angular/forms";
import {MatchingType} from '../types/matching.type';

export interface MatchingRequestDtoForm {
    type: FormControl<MatchingType>;
    category: FormControl<string>;
    complianceYear: FormControl<Date | string>;
}

