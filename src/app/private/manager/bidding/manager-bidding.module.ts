import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ManagerBiddingListPageComponent} from "./pages/bidding-list/manager-bidding-list-page.component";
import {AppCardModule} from "../../../shared/components/app-card";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {BiddingStatusesComponent} from "../../../shared/components/bidding-statuses/bidding-statuses.component";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ManagerBiddingViewComponent} from "./pages/manager-bidding-view/manager-bidding-view.component";
import {AppButtonModule} from "../../../shared/components/button/button";
import {AppToolbarModule} from "../../../shared/components/toolbar/toolbar";
import {ChevronDownIcon} from "primeng/icons/chevrondown";
import {TagModule} from "primeng/tag";
import {GeneralInformationComponent} from "../../shared/components/general-information/general-information.component";
import {ProcessFileModule} from "../../shared/components/process-files/process-file.module";
import {MessagesModule} from "primeng/messages";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {
    ManagerDocumentListComponent
} from "../../admin/evaluation/components/manager-document/manager-document-list.component";
import {
    QuestionAndAnswersFormComponent
} from '../../shared/components/question-and-answers-form/question-and-answers-form.component';
import {TagStatusesComponent} from '../../../shared/components/tag-statuses/tag-statuses.component';

export const routes: Routes = [
    {
        path: '',
        component: ManagerBiddingListPageComponent,
    },
    {
        data: {
            breadcrumb: '-'
        },
        path: 'view/:id',
        component: ManagerBiddingViewComponent,
    },
];

@NgModule({
    declarations: [ManagerBiddingListPageComponent, ManagerBiddingViewComponent],
    imports: [
        CommonModule,
        AppCardModule,
        AppDefaultColumnSeparatorGridModule,
        AppFilterModule,
        AppPaginatorModule,
        BiddingStatusesComponent,
        ButtonModule,
        MenuModule,
        SharedModule,
        TableModule,

        RouterModule.forChild(routes),
        AppButtonModule,
        AppToolbarModule,
        ChevronDownIcon,
        TagModule,
        GeneralInformationComponent,

        ProcessFileModule,
        MessagesModule,
        LoaderServiceModule,
        ManagerDocumentListComponent,
        QuestionAndAnswersFormComponent,
        TagStatusesComponent
    ]
})
export class ManagerBiddingModule {

}
