import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CityViewOrganizationComponent} from "./pages/organization-view/city-view-organization.component";
import {RouterModule, Routes} from "@angular/router";
import {AppCardModule} from "../../../shared/components/app-card";
import {
    OrganizationDataComponent
} from "../../admin/organization/components/organization/organization-data/organization-data.component";
import {
    LegalRepresentativeListComponent
} from "../../shared/components/legal-representative/legal-representative-list/legal-representative-list.component";
import {
    OrganizationUserListComponent
} from "../../admin/organization/components/organization-user/organization-user-list/organization-user-list.component";
import {BranchesListComponent} from "../../shared/components/branch/branch-list/branches-list.component";
import {
    OrganizationDocumentListContainerComponent
} from "../../shared/components/document/document-list/organization-document-list-container.component";
import {LoaderServiceModule} from "../../../shared/services/loader";

export const routes: Routes = [
    {
        path: 'view/:id',
        component: CityViewOrganizationComponent,
    },
];

@NgModule({
  declarations: [CityViewOrganizationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppCardModule,
        OrganizationDataComponent,
        LegalRepresentativeListComponent,
        OrganizationUserListComponent,
        BranchesListComponent,
        OrganizationDocumentListContainerComponent,
        LoaderServiceModule,
    ]
})
export class CityOrganizationModule {}
