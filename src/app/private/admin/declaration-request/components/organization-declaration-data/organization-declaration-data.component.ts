import {Component, Input} from '@angular/core';
import {AppViewDataComponent} from "../../../../../shared/components/app-view-data/app-view-data.component";
import {DatePipe} from "@angular/common";
import {GiroDataViewComponent} from "../../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {OrganizationTypeEnum} from "../../../../../shared/enums/organization-type.enum";
import {PartnerTypeEnum} from "../../../../../shared/enums/partner-type.enum";
import {CategoryTypeEnum} from "../../../../../shared/enums/category-type.enum";
import {SkeletonComponent} from '../../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-organization-declaration-data',
  standalone: true,
  imports: [
    AppViewDataComponent,
    DatePipe,
    GiroDataViewComponent,
    SkeletonComponent
  ],
  templateUrl: './organization-declaration-data.component.html',
  styleUrl: './organization-declaration-data.component.scss'
})
export class OrganizationDeclarationDataComponent {

  @Input()
  model: OrganizationResponseDto;

  @Input() isLoading: boolean = true;

  protected readonly OrganizationTypes = OrganizationTypeEnum;
  protected readonly PartnerType = PartnerTypeEnum;
  protected readonly ProducerType = CategoryTypeEnum;

}
