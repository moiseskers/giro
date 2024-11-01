import {Component, Input} from '@angular/core';
import {SkeletonModule} from "primeng/skeleton";
import {GiroDataViewComponent} from "../../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {AppViewDataComponent} from "../../../../../shared/components/app-view-data/app-view-data.component";
import {DatePipe, NgIf, TitleCasePipe} from "@angular/common";
import {DeclarationRequestResponseDto} from "../../../../../shared/models/declaration-request-response.dto";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";

@Component({
  selector: 'app-declaration-request-data',
  standalone: true,
    imports: [
        SkeletonModule,
        GiroDataViewComponent,
        AppViewDataComponent,
        DatePipe,
        NgIf,
        TitleCasePipe
    ],
  templateUrl: './declaration-request-data.component.html',
  styleUrl: './declaration-request-data.component.scss'
})
export class DeclarationRequestDataComponent {

    @Input() model: DeclarationRequestResponseDto;
    protected readonly DeclarationRequestType = DeclarationRequestRecurrence;

}
