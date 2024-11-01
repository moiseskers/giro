import {NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {ListOrganizationsPageComponent} from "./pages/organizations-list/list-organizations-page.component";
import {OrganizationRoutingModule} from "./organization-routing.module";
import {TableModule} from "primeng/table";
import {MenubarModule} from "primeng/menubar";
import {RippleModule} from "primeng/ripple";
import {DividerModule} from "primeng/divider";
import {OrganizationStatusesModule} from "./components/organization/organization-statuses/organization-statuses.module";

import {DialogService} from "primeng/dynamicdialog";
import {OrganizationFormComponent} from "./components/organization/organization-form/organization-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {TagModule} from "primeng/tag";
import {ViewOrganizationComponent} from "./pages/organization-view/view-organization.component";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {SkeletonModule} from "primeng/skeleton";
import {MenuModule} from "primeng/menu";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {
    OrganizationDocumentListContainerComponent
} from "../../shared/components/document/document-list/organization-document-list-container.component";
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";
import {LegalRepresentativeService} from "../../shared/services/legal-representative.service";

import {OrganizationEditComponent} from "./components/organization/organization-edit/organization-edit.component";
import {OrganizationCreateComponent} from "./components/organization/organization-create/organization-create.component";
import {RadioButtonModule} from "primeng/radiobutton";
import {BranchService} from "../../shared/services/branch.service";
import {RejectedFormComponent} from './components/rejected-form/rejected-form.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {DocumentService} from "../../shared/services/document.service";

import {OrganizationDataComponent} from "./components/organization/organization-data/organization-data.component";
import {
    OrganizationUserListComponent
} from "./components/organization-user/organization-user-list/organization-user-list.component";
import {OrganizationUserService} from "../../shared/services/organization-user.service";
import {ChevronDownIcon} from "primeng/icons/chevrondown";
import {FormErrorModule} from "../../../shared/components/form-error";
import {FocusFirstInvalidFieldModule} from "../../../shared/directives/focus-first-invalid-field";
import {GiroUploadComponent} from "../../../shared/components/upload/giro-upload.component";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppCardModule} from "../../../shared/components/app-card";
import {GiroDataViewComponent} from "../../../shared/components/giro-menu-bar/giro-data-view.component";
import {AutofocusModule} from "../../../shared/directives/autofocus";
import {AppButtonModule} from "../../../shared/components/button/button";
import {AppToolbarModule} from "../../../shared/components/toolbar/toolbar";
import {AutoCompleteModule} from "primeng/autocomplete";
import {AppAutoCompleteModule} from "../../../shared/components/autocomplete/app-auto-complete.component";
import {AppViewDataComponent} from "../../../shared/components/app-view-data/app-view-data.component";
import {SeparationArrayPipeModule} from "../../../shared/pipes/separation-array/separation-array-pipe.module";
import {
    LegalRepresentativeListComponent
} from "../../shared/components/legal-representative/legal-representative-list/legal-representative-list.component";
import {BranchesListComponent} from "../../shared/components/branch/branch-list/branches-list.component";
import {
    MultiselectCheckboxComponent
} from "../../../shared/components/multiselect-checkbox/multiselect-checkbox.component";
import {BlockUIModule} from "primeng/blockui";
import {PanelModule} from "primeng/panel";
import {ToUpperCaseDirective} from "../../../shared/directives/to-upper-case/to-upper-case.directive";
import {RedAsteriskDirective} from '../../../shared/directives/red-asterisk-directive/red-asterisk.directive';

@NgModule({
    declarations: [
        ListOrganizationsPageComponent,

        OrganizationFormComponent,
        OrganizationEditComponent,
        OrganizationCreateComponent,

        ViewOrganizationComponent,
        RejectedFormComponent,

    ],
    providers: [ DialogService, LegalRepresentativeService, OrganizationUserService, NgxMaskPipe, BranchService, DocumentService, TitleCasePipe ],
    exports: [
        OrganizationCreateComponent,
        GiroDataViewComponent,
        ViewOrganizationComponent
    ],
    imports: [
        CommonModule,
        OrganizationRoutingModule,
        AppCardModule,
        AppDefaultColumnSeparatorGridModule,
        TableModule,
        AppFilterModule,
        MenubarModule,
        RippleModule,
        DividerModule,
        OrganizationStatusesModule,
        AppPaginatorModule,
        LoaderServiceModule,
        FormErrorModule,
        ReactiveFormsModule,
        DropdownModule,
        GiroUploadComponent,
        FocusFirstInvalidFieldModule,
        MultiSelectModule,
        FormsModule,
        TagModule,
        ToolbarModule,
        SplitButtonModule,
        SkeletonModule,
        MenuModule,
        OverlayPanelModule,
        NgxMaskDirective,
        NgxMaskPipe,
        RadioButtonModule,
        InputTextareaModule,
        AutofocusModule,
        AppButtonModule,
        AppToolbarModule,
        AutoCompleteModule,
        AppAutoCompleteModule,
        AppViewDataComponent,
        GiroDataViewComponent,
        ChevronDownIcon,
        SeparationArrayPipeModule,
        FormErrorModule,
        FocusFirstInvalidFieldModule,
        OrganizationDataComponent,
        LegalRepresentativeListComponent,
        OrganizationUserListComponent,
        BranchesListComponent,
        OrganizationDocumentListContainerComponent,
        MultiselectCheckboxComponent,
        BlockUIModule,
        PanelModule,
        ToUpperCaseDirective,
        RedAsteriskDirective,
    ]
})
export class OrganizationModule { }
