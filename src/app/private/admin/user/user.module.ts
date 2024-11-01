import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListPageComponent} from "./pages/user-list/user-list-page.component";
import {UserRoutingModule} from "./user-routing.module";
import {TableModule} from "primeng/table";
import {MenubarModule} from "primeng/menubar";
import {RippleModule} from "primeng/ripple";
import {DividerModule} from "primeng/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {TagModule} from "primeng/tag";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {SkeletonModule} from "primeng/skeleton";
import {MenuModule} from "primeng/menu";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";
import {UserFormComponent} from "./components/users/user-form/user-form.component";
import {RadioButtonModule} from "primeng/radiobutton";
import {UserCreateComponent} from "./components/users/user-create/user-create.component";
import {UserEditComponent} from "./components/users/user-edit/user-edit.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AutoCompleteModule} from "primeng/autocomplete";
import {
    OrganizationStatusesModule
} from "../organization/components/organization/organization-statuses/organization-statuses.module";
import {UserDataComponent} from "./components/users/user-data/user-data.component";
import {ManagerService} from "../../shared/services/manager.service";
import {UserViewComponent} from "./pages/view-user/user-view.component";
import {DialogService} from "primeng/dynamicdialog";
import {UserStatusesComponent} from "./components/user-statuses/user-statuses.component";
import {AutofocusModule} from "../../../shared/directives/autofocus";
import {AppButtonModule} from "../../../shared/components/button/button";
import {AppToolbarModule} from "../../../shared/components/toolbar/toolbar";
import {AppAutoCompleteModule} from "../../../shared/components/autocomplete/app-auto-complete.component";
import {GiroDataViewComponent} from "../../../shared/components/giro-menu-bar/giro-data-view.component";
import {AppViewDataComponent} from "../../../shared/components/app-view-data/app-view-data.component";
import {AppCardModule} from "../../../shared/components/app-card";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {FormErrorModule} from "../../../shared/components/form-error";
import {FocusFirstInvalidFieldModule} from "../../../shared/directives/focus-first-invalid-field";
import {GiroUploadComponent} from "../../../shared/components/upload/giro-upload.component";
import {RedAsteriskDirective} from '../../../shared/directives/red-asterisk-directive/red-asterisk.directive';

@NgModule({
    declarations: [
        UserListPageComponent,

        UserFormComponent,
        UserCreateComponent,
        UserEditComponent,

        UserDataComponent,
        UserViewComponent,

        UserStatusesComponent
    ],
    providers: [ManagerService, DialogService],
    exports: [
        UserFormComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
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
        GiroDataViewComponent,
        AppViewDataComponent,

        ReactiveFormsModule,
        FormsModule,
        RedAsteriskDirective,
    ]
})
export class UserModule {
}
