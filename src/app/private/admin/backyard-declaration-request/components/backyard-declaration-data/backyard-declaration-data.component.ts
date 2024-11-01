import {Component, Input} from '@angular/core';
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';

@Component({
    selector: 'app-backyard-declaration-data',
    templateUrl: './backyard-declaration-data.component.html',
    styleUrl: './backyard-declaration-data.component.scss'
})
export class BackyardDeclarationDataComponent {

    @Input()
    model: DeclarationResponseDto;

    get getAddress(): string {
        if (!GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.branch?.address, this.model?.branch?.city, this.model?.branch?.state)) {
            return `${this.model?.branch?.address}, ${this.model?.branch?.city}, ${this.model?.branch?.state}`;
        }
        return '-';
    }

}
