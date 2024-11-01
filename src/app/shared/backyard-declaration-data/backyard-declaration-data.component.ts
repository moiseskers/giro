import {Component, Input} from '@angular/core';
import {DeclarationResponseDto} from "../models/declaration-response.dto";
import {GiroDataViewComponent} from "../components/giro-menu-bar/giro-data-view.component";
import {AppViewDataComponent} from "../components/app-view-data/app-view-data.component";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {GeneralHelper} from '../helpers/general-helper';

@Component({
    selector: 'app-backyard-declaration-data',
    templateUrl: './backyard-declaration-data.component.html',
    styleUrl: './backyard-declaration-data.component.scss',
    standalone: true,
    imports: [
        GiroDataViewComponent,
        AppViewDataComponent,
        DatePipe,
        TitleCasePipe
    ]
})
export class BackyardDeclarationDataComponent {

    @Input() model: DeclarationResponseDto;

    get getAddress(): string {
        if (!GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.branch?.address, this.model?.branch?.city, this.model?.branch?.state)) {
            return `${this.model?.branch?.address}, ${this.model?.branch?.city}, ${this.model?.branch?.state}`;
        }
        return '-';
    }

}
