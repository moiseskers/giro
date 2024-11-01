import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe, TitleCasePipe} from '@angular/common';
import {
    IndustrialConsumerBackyardDeclarationRequestListPageComponent
} from './pages/industrial-consumer-backyard-declaration-request-list-page/industrial-consumer-backyard-declaration-request-list-page.component';
import {AppCardModule} from "../../../shared/components/app-card";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {
    DeclarationProducerListComponent
} from "../../producer/producer-declaration/components/declaration-producer-list/declaration-producer-list.component";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {ButtonModule} from "primeng/button";
import {CigStatusesComponent} from "../../admin/cig/components/cig-statuses/cig-statuses.component";
import {MenuModule} from "primeng/menu";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {
    DeclarationRequestStatusesComponent
} from "../../shared/components/declaration-request-statuses/declaration-request-statuses.component";
import {HasAnyRolePipeModule} from "../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {RouterModule, Routes} from "@angular/router";
import {
    DeclarationStatusesComponent
} from "../../shared/components/declaration-statuses/declaration-statuses.component";
import {
    BackyardDeclarationDataComponent
} from "../../../shared/backyard-declaration-data/backyard-declaration-data.component";
import {GiroDataViewComponent} from "../../../shared/components/giro-menu-bar/giro-data-view.component";
import {AppViewDataComponent} from "../../../shared/components/app-view-data/app-view-data.component";
import {
    IndustrialConsumerDeclarationViewPageComponent
} from "./pages/industrial-consumer-declaration-view-page/industrial-consumer-declaration-view-page.component";
import {AppButtonModule} from "../../../shared/components/button/button";
import {AppToolbarModule} from "../../../shared/components/toolbar/toolbar";
import {
    IndustrialConsumerDeclarationItemListContainerComponent
} from "./containers/industrial-consumer-declaration-item-list-container/industrial-consumer-declaration-item-list-container.component";
import {
    DeclarationItemListComponent
} from "../../shared/components/declaration-item-list/declaration-item-list.component";
import {EmptyImageComponent} from "../../shared/components/empty-image/empty-image.component";
import {
    IndustrialConsumerDocumentListContainerComponent
} from "./containers/industrial-consumer-document-list-container/industrial-consumer-document-list-container.component";
import {
    DocumentDeclarationStatusesComponent
} from "../../admin/backyard-declaration-request/components/backyard-declaration-document-statuses/document-declaration-statuses.component";
import {
    IndustrialConsumerDocumentCreateContainerComponent
} from './containers/industrial-consumer-document-create-container/industrial-consumer-document-create-container.component';
import {DocumentFormComponent} from "../../shared/components/document/document-form/document-form.component";
import {
    IndustrialConsumerDeclarationContainerCreateComponent
} from "./containers/industrial-consumer-declaration-item-create-container/industrial-consumer-declaration-container-create.component";
import {
    DeclarationTableFormComponent
} from "../../shared/components/tons-declaration-table-form/declaration-table-form.component";
import {
    BackyardDeclarationItemListComponent
} from "../../shared/components/backyard-declaration-item-list/backyard-declaration-item-list.component";
import {
    BackyardDeclarationItemTableForm
} from "../../shared/components/backyard-declaration-item-table-form/backyard-declaration-item-table-form.component";
import {
    BackyardDeclarationRequestListComponent
} from '../../shared/components/backyard-declaration-request-list/backyard-declaration-request-list.component';
import {BackyardDocumentListComponent} from '../../../shared/backyard-document-list/backyard-document-list.component';
import {
    IndustrialConsumerDeclarationContainerEditComponent
} from './containers/industrial-consumer-declaration-container-edit/industrial-consumer-declaration-container-edit.component';
import {MilligramsPipe} from '../../../shared/pipes/milligrams/milligrams.pipe';
import {ToBooleanV2Pipe} from '../../../shared/services/loader/to-booleanV2.pipe';

export const routes: Routes = [
    {
        path: '',
        component: IndustrialConsumerBackyardDeclarationRequestListPageComponent,
    },
    {
        data: {
            breadcrumb: '-'
        },
        path: 'view/:id',
        component: IndustrialConsumerDeclarationViewPageComponent,
    },
];

@NgModule({
    declarations: [
        IndustrialConsumerDeclarationContainerCreateComponent,
        IndustrialConsumerDocumentListContainerComponent,
        IndustrialConsumerBackyardDeclarationRequestListPageComponent,
        IndustrialConsumerDeclarationViewPageComponent,
        IndustrialConsumerDeclarationItemListContainerComponent,
        IndustrialConsumerDocumentCreateContainerComponent,
        IndustrialConsumerDeclarationContainerEditComponent,
    ],
    providers: [DecimalPipe, TitleCasePipe, MilligramsPipe],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCardModule,
        AppDefaultColumnSeparatorGridModule,
        AppFilterModule,
        AppPaginatorModule,
        DeclarationProducerListComponent,
        LoaderServiceModule,
        ButtonModule,
        CigStatusesComponent,
        MenuModule,
        SharedModule,
        TableModule,
        DeclarationRequestStatusesComponent,
        HasAnyRolePipeModule,
        DeclarationStatusesComponent,
        GiroDataViewComponent,
        AppViewDataComponent,
        AppButtonModule,
        AppToolbarModule,
        DeclarationItemListComponent,
        EmptyImageComponent,
        DocumentDeclarationStatusesComponent,
        DocumentFormComponent,
        DeclarationTableFormComponent,
        BackyardDeclarationItemListComponent,
        BackyardDeclarationItemTableForm,
        BackyardDeclarationRequestListComponent,
        BackyardDeclarationDataComponent,
        BackyardDocumentListComponent,
        ToBooleanV2Pipe
    ],
})
export class IndustrialConsumerBackyardDeclarationModule {
}
