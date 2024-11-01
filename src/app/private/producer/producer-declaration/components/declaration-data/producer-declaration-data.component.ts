import {Component, Input} from '@angular/core';
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";

@Component({
  selector: 'app-producer-declaration-data',
  templateUrl: './producer-declaration-data.component.html',
  styleUrl: './producer-declaration-data.component.scss'
})
export class ProducerDeclarationDataComponent {

    @Input() model: DeclarationResponseDto;
    protected readonly DeclarationRequestType = DeclarationRequestRecurrence;

}
