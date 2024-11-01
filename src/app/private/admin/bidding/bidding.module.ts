import {NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {BiddingListPageComponent} from "./pages/bidding-list/bidding-list-page.component";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {BiddingRoutingModule} from "./bidding-routing.module";
import {DialogService} from "primeng/dynamicdialog";
import {BiddingCreateComponent} from "./components/bidding-create/bidding-create.component";
import {BiddingFormComponent} from "./components/bidding-form/bidding-form.component";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";
import {MenuModule} from "primeng/menu";
import {CancelBiddingFormComponent} from "./components/cancel-bidding-form/cancel-bidding-form.component";
import {BiddingViewComponent} from "./pages/bidding-view/bidding-view.component";
import {SplitButtonModule} from "primeng/splitbutton";
import {SkeletonModule} from "primeng/skeleton";
import {ChevronDownIcon} from "primeng/icons/chevrondown";
import {
    ProcessFilesCreateComponent
} from "../../shared/components/process-files/process-files-create/process-files-create.component";
import {
    RegisteredManagerListComponent
} from "./components/registered-manager/registered-manager-list/registered-manager-list.component";
import {
    RegisteredManagerCreateComponent
} from "./components/registered-manager/registered-manager-create/registered-manager-create.component";
import {
    RegisteredManagerFormComponent
} from "./components/registered-manager/registered-manager-form/registered-manager-form.component";
import {
    RegisteredManagerStatusesComponent
} from "./components/registered-manager-statuses/registered-manager-statuses.component";
import {RegisteredManagerService} from "./services/registered-manager.service";
import {BiddingEditComponent} from "./components/bidding-edit/bidding-edit.component";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {AppCardModule} from "../../../shared/components/app-card";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {FocusFirstInvalidFieldModule} from "../../../shared/directives/focus-first-invalid-field";
import {FormErrorModule} from "../../../shared/components/form-error";
import {AppCalendarModule} from "../../../shared/components/calendar/calendar";
import {AppAutoCompleteModule} from "../../../shared/components/autocomplete/app-auto-complete.component";
import {GiroUploadComponent} from "../../../shared/components/upload/giro-upload.component";
import {AppInputNumberModule} from "../../../shared/components/inputnumber/inputnumber";
import {AppToolbarModule} from "../../../shared/components/toolbar/toolbar";
import {GiroDataViewComponent} from "../../../shared/components/giro-menu-bar/giro-data-view.component";
import {AppViewDataComponent} from "../../../shared/components/app-view-data/app-view-data.component";
import {AppButtonModule} from "../../../shared/components/button/button";
import {BiddingStatusesComponent} from "../../../shared/components/bidding-statuses/bidding-statuses.component";
import {GeneralInformationComponent} from "../../shared/components/general-information/general-information.component";
import {ProcessFileModule} from "../../shared/components/process-files/process-file.module";
import {
    QuestionAndAnswersFormComponent
} from '../../shared/components/question-and-answers-form/question-and-answers-form.component';
import {RedAsteriskDirective} from '../../../shared/directives/red-asterisk-directive/red-asterisk.directive';
import {TagStatusesComponent} from '../../../shared/components/tag-statuses/tag-statuses.component';

@NgModule({
    declarations: [
        BiddingEditComponent,
        RegisteredManagerStatusesComponent,
        RegisteredManagerFormComponent,
        RegisteredManagerCreateComponent,
        ProcessFilesCreateComponent,
        RegisteredManagerListComponent,
        BiddingViewComponent,
        BiddingListPageComponent,
        BiddingCreateComponent,
        BiddingFormComponent,
        CancelBiddingFormComponent],
    providers: [DialogService, NgxMaskPipe, TitleCasePipe, RegisteredManagerService],
    exports: [
        BiddingListPageComponent,
    ],
    imports: [
        CommonModule,
        AppDefaultColumnSeparatorGridModule,
        TableModule,
        AppPaginatorModule,
        AppFilterModule,
        AppCardModule,
        TagModule,
        LoaderServiceModule,
        BiddingRoutingModule,
        DividerModule,
        ButtonModule,
        ReactiveFormsModule,
        FocusFirstInvalidFieldModule,
        FormErrorModule,
        DropdownModule,
        AppCalendarModule,
        InputTextareaModule,
        AppCalendarModule,
        InputNumberModule,
        AppAutoCompleteModule,
        FormsModule,
        GiroUploadComponent,
        AppInputNumberModule,
        NgxMaskDirective,
        MenuModule,
        AppToolbarModule,
        SplitButtonModule,
        AppViewDataComponent,
        GiroDataViewComponent,
        SkeletonModule,
        AppButtonModule,
        ChevronDownIcon,
        BiddingStatusesComponent,
        GeneralInformationComponent,
        ProcessFileModule,
        QuestionAndAnswersFormComponent,
        RedAsteriskDirective,
        TagStatusesComponent
    ]
})
export class BiddingModule {
}
