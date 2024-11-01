import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerViewOrganizationComponent} from "./pages/organization-view/manager-view-organization.component";
import {AppButtonModule} from "../../../shared/components/button/button";
import {AppCardModule} from "../../../shared/components/app-card";
import {AppToolbarModule} from "../../../shared/components/toolbar/toolbar";
import {ChevronDownIcon} from "primeng/icons/chevrondown";
import {MenuModule} from "primeng/menu";
import {SharedModule} from "primeng/api";
import {RouterModule, Routes} from "@angular/router";
import {LoaderServiceModule} from "../../../shared/services/loader";
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

export const routes: Routes = [
    {
        path: 'view/:id',
        component: ManagerViewOrganizationComponent,
    },
];

@NgModule({
  declarations: [ManagerViewOrganizationComponent],
    imports: [
        CommonModule,
        AppButtonModule,
        AppCardModule,
        AppToolbarModule,
        ChevronDownIcon,
        MenuModule,
        SharedModule,
        RouterModule.forChild(routes),
        LoaderServiceModule,
        OrganizationDataComponent,
        LegalRepresentativeListComponent,
        OrganizationUserListComponent,
        LegalRepresentativeListComponent,
        BranchesListComponent,
        BranchesListComponent,
        OrganizationDocumentListContainerComponent,
    ]
})
export class ManagerOrganizationModule { }
