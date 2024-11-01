import {FormControl} from "@angular/forms";

export interface CreateDeclarationRequestRequestForm {
    recurrence?: FormControl<string>;
    endDate: FormControl<string | Date>;
    organizations:  FormControl<CreateDeclarationOrganizationRequestRequestDtoForm[]>;
    declaredMonthYear: FormControl<string | Date>;

}

export interface CreateDeclarationOrganizationRequestRequestDtoForm {
    id: string;
    branchId?: string;
}
