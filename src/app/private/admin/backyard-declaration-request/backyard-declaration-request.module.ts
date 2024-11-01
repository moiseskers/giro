import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {
    BackyardDeclarationRequestListPageComponent
} from "./pages/backyard-declaration-request-list-page/backyard-declaration-request-list-page.component";
import {AppCardModule} from "../../../shared/components/app-card";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {
    DeclarationRequestListComponent
} from "../../shared/components/declaration-request-list/declaration-request-list.component";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {
    AdminBackyardDeclarationRequestListComponent
} from "./components/backyard-declaration-request-list/admin-backyard-declaration-request-list.component";
import {RouterModule, Routes} from "@angular/router";
import {DialogService} from "primeng/dynamicdialog";
import {
    BackyardDeclarationRequestCreateContainerComponent
} from './containers/backyard-declaration-request-create-container/backyard-declaration-request-create-container.component';
import {
    DeclarationRequestFormComponent
} from "../../shared/components/declaration-request-form/declaration-request-form.component";
import {
    BackyardDeclarationRequestViewPageComponent
} from './pages/backyard-declaration-request-view-page/backyard-declaration-request-view-page.component';
import {AppButtonModule} from "../../../shared/components/button/button";
import {AppToolbarModule} from "../../../shared/components/toolbar/toolbar";
import {ChevronDownIcon} from "primeng/icons/chevrondown";
import {
    DeclarationRequestDataComponent
} from "../declaration-request/components/declaration-request-data/declaration-request-data.component";
import {
    DeclarationRequestStatusesComponent
} from "../../shared/components/declaration-request-statuses/declaration-request-statuses.component";
import {MenuModule} from "primeng/menu";
import {SharedModule} from "primeng/api";
import {
    BackyardDeclarationRequestDataComponent
} from "./components/backyard-declaration-request-data/backyard-declaration-request-data.component";
import {GiroDataViewComponent} from "../../../shared/components/giro-menu-bar/giro-data-view.component";
import {AppViewDataComponent} from "../../../shared/components/app-view-data/app-view-data.component";
import {
    BackyardDeclarationListContainerComponent
} from './containers/backyard-declaration-list-container/backyard-declaration-list-container.component';
import {DeclarationListComponent} from "../declaration-request/components/declaration-list/declaration-list.component";
import {
    BackyardDeclarationListComponent
} from "./components/backyard-declaration-list/backyard-declaration-list.component";
import {TableModule} from "primeng/table";
import {
    DeclarationStatusesComponent
} from "../../shared/components/declaration-statuses/declaration-statuses.component";
import {ButtonModule} from "primeng/button";
import {
    BackyardDeclarationRequestEditContainerComponent
} from './containers/backyard-declaration-request-edit-container/backyard-declaration-request-edit-container.component';
import {DividerModule} from "primeng/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FocusFirstInvalidFieldModule} from "../../../shared/directives/focus-first-invalid-field";
import {AppCalendarModule} from "../../../shared/components/calendar/calendar";
import {FormErrorModule} from "../../../shared/components/form-error";
import {AppAutoCompleteModule} from "../../../shared/components/autocomplete/app-auto-complete.component";
import {
    BackyardDeclarationRequestDetailViewPageComponent
} from './pages/backyard-declaration-request-detail-view-page/backyard-declaration-request-detail-view-page.component';
import {
    OrganizationDeclarationDataComponent
} from "../declaration-request/components/organization-declaration-data/organization-declaration-data.component";
import {
    BackyardDeclarationDataComponent
} from "./components/backyard-declaration-data/backyard-declaration-data.component";
import {
    BackyardDeclarationItemListContainerComponent
} from "./containers/backyard-declaration-item-list-container/backyard-declaration-item-list-container.component";
import {EmptyImageComponent} from "../../shared/components/empty-image/empty-image.component";
import {
    BackyardDeclarationContainerEditComponent
} from "./containers/backyard-declaration-item-edit-container/backyard-declaration-container-edit.component";
import {
    BackyardDeclarationItemTableForm
} from "../../shared/components/backyard-declaration-item-table-form/backyard-declaration-item-table-form.component";
import {
    BackyardDocumentCreateContainerComponent
} from "./containers/backyard-document-create-container/backyard-document-create-container.component";
import {
    BackyardDocumentListContainerComponent
} from "./containers/backyard-document-container-list/backyard-document-list-container.component";
import {DocumentFormComponent} from "../../shared/components/document/document-form/document-form.component";
import {
    DocumentDeclarationStatusesComponent
} from "./components/backyard-declaration-document-statuses/document-declaration-statuses.component";
import {
    BackyardDeclarationHistoryListContainerComponent
} from "./containers/backyard-declaration-history-list-container/backyard-declaration-history-list-container.component";
import {
    BackyardDeclarationHistoryListComponent
} from "./components/backyard-declaration-history-list/backyard-declaration-history-list.component";
import {
    BackyardDeclarationItemListComponent
} from "../../shared/components/backyard-declaration-item-list/backyard-declaration-item-list.component";
import {
    BackyardDeclarationContainerCreateComponent
} from "./containers/backyard-declaration-item-create-container/backyard-declaration-container-create.component";
import {CheckEmptyPipe} from "../../../shared/pipes/check-empty/check-empty.pipe";
import {ToBooleanV2Pipe} from '../../../shared/services/loader/to-booleanV2.pipe';
import {MilligramsPipe} from '../../../shared/pipes/milligrams/milligrams.pipe';
import {
    DeclarationTableFormComponent
} from '../../shared/components/tons-declaration-table-form/declaration-table-form.component';
import {
    AppFilterWithLoaderComponent
} from '../../../shared/components/app-filter-with-loader/app-filter-with-loader.component';
import {SkeletonComponent} from '../../../shared/components/skeleton/skeleton.component';

export const DECLARATION_TYPE = new InjectionToken<string>('DECLARATION_TYPE');

export const routes: Routes = [
    {
        path: '',
        component: BackyardDeclarationRequestListPageComponent,
    },
    {
        data: {
            breadcrumb: '-'
        },
        path: 'view/:id',
        component: BackyardDeclarationRequestViewPageComponent,
    },
    {
        data: {
            breadcrumb: '-'
        },
        path: 'view/:id/detail/:declarationId',
        component: BackyardDeclarationRequestDetailViewPageComponent,
    },
];

@NgModule({
    declarations: [BackyardDeclarationContainerCreateComponent, BackyardDeclarationHistoryListContainerComponent, BackyardDocumentListContainerComponent, BackyardDocumentCreateContainerComponent, BackyardDeclarationContainerEditComponent, AdminBackyardDeclarationRequestListComponent, BackyardDeclarationItemListContainerComponent, BackyardDeclarationDataComponent, BackyardDeclarationRequestEditContainerComponent, BackyardDeclarationListComponent, BackyardDeclarationRequestDataComponent, BackyardDeclarationRequestListPageComponent, BackyardDeclarationRequestCreateContainerComponent, BackyardDeclarationRequestViewPageComponent, BackyardDeclarationListContainerComponent, BackyardDeclarationRequestEditContainerComponent, BackyardDeclarationRequestDetailViewPageComponent],
    providers: [DecimalPipe, DialogService, {provide: DECLARATION_TYPE, useValue: 'INDUSTRIAL_DECLARATION'}],
    exports: [
        AdminBackyardDeclarationRequestListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppCardModule,
        AppDefaultColumnSeparatorGridModule,
        AppFilterModule,
        AppPaginatorModule,
        DeclarationRequestListComponent,
        LoaderServiceModule,
        DeclarationRequestFormComponent,
        AppButtonModule,
        AppToolbarModule,
        ChevronDownIcon,
        DeclarationRequestDataComponent,
        DeclarationRequestStatusesComponent,
        MenuModule,
        SharedModule,
        GiroDataViewComponent,
        AppViewDataComponent,
        DeclarationListComponent,
        TableModule,
        DeclarationStatusesComponent,
        ButtonModule,
        DividerModule,
        ReactiveFormsModule,
        FocusFirstInvalidFieldModule,
        AppCalendarModule,
        FormErrorModule,
        AppAutoCompleteModule,
        FormsModule,
        OrganizationDeclarationDataComponent,
        EmptyImageComponent,
        BackyardDeclarationItemTableForm,
        DocumentFormComponent,
        DocumentDeclarationStatusesComponent,
        BackyardDeclarationHistoryListComponent,
        BackyardDeclarationItemListComponent,
        CheckEmptyPipe,
        ToBooleanV2Pipe,
        MilligramsPipe,
        DeclarationTableFormComponent,
        AppFilterWithLoaderComponent,
        SkeletonComponent
    ]
})
export class BackyardDeclarationRequestModule {
}
