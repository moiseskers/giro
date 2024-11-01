import {NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {EvaluationService} from "./services/evaluation.service";
import {EvaluationListPageComponent} from "./pages/evaluation-list-page/evaluation-list-page.component";
import {TableModule} from "primeng/table";
import {
    ApplicationStatusesComponent
} from "../../shared/components/application-statuses/application-statuses.component";
import {TagModule} from "primeng/tag";
import {EvaluationRoutingModule} from "./evaluation-routing.module";
import {DialogService} from "primeng/dynamicdialog";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";
import {MenuModule} from "primeng/menu";
import {SplitButtonModule} from "primeng/splitbutton";
import {SkeletonModule} from "primeng/skeleton";
import {ChevronDownIcon} from "primeng/icons/chevrondown";
import {
    EvaluationDetailsListPageComponent
} from "./pages/evaluation-details-page/evaluation-details-list-page.component";
import {EvaluationViewComponent} from "./pages/evaluation-view-page/evaluation-view.component";
import {ManagerInformationComponent} from "./components/manager-information/manager-information.component";
import {EvaluationComponent} from "../../shared/components/evaluation/evaluation.component";
import {ManagerDocumentListComponent} from "./components/manager-document/manager-document-list.component";
import {RejectEvaluationFormComponent} from "./components/reject-evaluation-form/reject-evaluation-form.component";
import {EvaluationStatusesComponent} from "./components/evaluation-statuses/evaluation-statuses.component";
import {FocusFirstInvalidFieldModule} from "../../../shared/directives/focus-first-invalid-field";
import {FormErrorModule} from "../../../shared/components/form-error";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppCardModule} from "../../../shared/components/app-card";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppCalendarModule} from "../../../shared/components/calendar/calendar";
import {AppAutoCompleteModule} from "../../../shared/components/autocomplete/app-auto-complete.component";
import {GiroUploadComponent} from "../../../shared/components/upload/giro-upload.component";
import {AppInputNumberModule} from "../../../shared/components/inputnumber/inputnumber";
import {AppToolbarModule} from "../../../shared/components/toolbar/toolbar";
import {AppViewDataComponent} from "../../../shared/components/app-view-data/app-view-data.component";
import {GiroDataViewComponent} from "../../../shared/components/giro-menu-bar/giro-data-view.component";
import {AppButtonModule} from "../../../shared/components/button/button";
import {SeparationArrayPipeModule} from "../../../shared/pipes/separation-array/separation-array-pipe.module";
import {BiddingStatusesComponent} from "../../../shared/components/bidding-statuses/bidding-statuses.component";
import {RedAsteriskDirective} from '../../../shared/directives/red-asterisk-directive/red-asterisk.directive';

@NgModule({
    declarations: [
        EvaluationListPageComponent,
        EvaluationDetailsListPageComponent,
        EvaluationViewComponent,
        RejectEvaluationFormComponent,
        EvaluationStatusesComponent
    ],
    providers: [EvaluationService, DialogService, NgxMaskPipe, TitleCasePipe],
    imports: [
        CommonModule,
        AppDefaultColumnSeparatorGridModule,
        TableModule,
        AppPaginatorModule,
        AppFilterModule,
        AppCardModule,
        TagModule,
        LoaderServiceModule,
        EvaluationRoutingModule,
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
        SeparationArrayPipeModule,
        BiddingStatusesComponent,
        ApplicationStatusesComponent,
        ManagerInformationComponent,
        EvaluationComponent,
        ManagerDocumentListComponent,
        RedAsteriskDirective
    ]
})
export class EvaluationModule {
}
