import {Component, Input} from '@angular/core';
import {DeclarationRequestResponseDto} from "../../../../../shared/models/declaration-request-response.dto";

@Component({
  selector: 'app-backyard-declaration-request-data',
  templateUrl: './backyard-declaration-request-data.component.html',
  styleUrl: './backyard-declaration-request-data.component.scss'
})
export class BackyardDeclarationRequestDataComponent {

    @Input() model: DeclarationRequestResponseDto;
    @Input() isLoading: boolean;

}

