import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessFilesFormComponent} from "./process-files-form/process-files-form.component";
import {ProcessFilesListComponent} from "./process-files-list/process-files-list.component";
import {GiroDataViewComponent} from "../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {AppPaginatorModule} from "../../../../shared/components/app-paginator";
import {GiroUploadComponent} from "../../../../shared/components/upload/giro-upload.component";
import {DividerModule} from "primeng/divider";
import {ReactiveFormsModule} from "@angular/forms";
import {FocusFirstInvalidFieldModule} from "../../../../shared/directives/focus-first-invalid-field";
import {HasAnyRolePipeModule} from "../../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {HasAnyRoleModule} from "../../../../shared/directives/has-role/has-any-role.module";

@NgModule({
  declarations: [
      ProcessFilesFormComponent,
      ProcessFilesFormComponent,
      ProcessFilesListComponent
  ],
  exports: [
    ProcessFilesListComponent,
    ProcessFilesFormComponent,
    ProcessFilesFormComponent
  ],
    imports: [
        CommonModule,
        GiroDataViewComponent,
        TableModule,
        ButtonModule,
        AppPaginatorModule,
        GiroUploadComponent,
        DividerModule,
        ReactiveFormsModule,
        FocusFirstInvalidFieldModule,
        HasAnyRolePipeModule,
        HasAnyRoleModule
    ]
})
export class ProcessFileModule { }
