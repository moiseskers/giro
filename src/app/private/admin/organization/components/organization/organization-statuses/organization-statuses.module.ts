import {NgModule} from '@angular/core';
import {OrganizationStatusesComponent} from './organization-statuses.component';
import {BadgeModule} from 'primeng/badge';
import {CommonModule} from '@angular/common';
import {TooltipModule} from 'primeng/tooltip';
import {TagModule} from "primeng/tag";

@NgModule({
    imports: [
        BadgeModule,
        CommonModule,
        TooltipModule,
        TagModule
    ],
    exports: [OrganizationStatusesComponent],
    declarations: [OrganizationStatusesComponent],
    providers: [],
})
export class OrganizationStatusesModule {}
