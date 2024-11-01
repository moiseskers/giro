import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {
    ManagerBackyardDeclarationRequestListPageComponent
} from './pages/manager-backyard-declaration-request-list-page/manager-backyard-declaration-request-list-page.component';
import {AppCardModule} from "../../../shared/components/app-card";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {ButtonModule} from "primeng/button";
import {
    DeclarationStatusesComponent
} from "../../shared/components/declaration-statuses/declaration-statuses.component";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {
    BackyardDeclarationRequestListComponent
} from "../../shared/components/backyard-declaration-request-list/backyard-declaration-request-list.component";
import {
    ManagerBackyardDocumentCreateContainerComponent
} from "./containers/manager-backyard-document-create-container/manager-backyard-document-create-container.component";
import {
    ManagerBackyardDocumentListContainerComponent
} from "./containers/manager-backyard-document-list-container/manager-backyard-document-list-container.component";
import {
    ManagerBackyardDeclarationViewPageComponent
} from "./pages/manager-backyard-declaration-view-page/manager-backyard-declaration-view-page.component";
import {AppToolbarModule} from "../../../shared/components/toolbar/toolbar";
import {AppButtonModule} from "../../../shared/components/button/button";
import {
    BackyardDeclarationDataComponent
} from "../../../shared/backyard-declaration-data/backyard-declaration-data.component";
import {DocumentFormComponent} from "../../shared/components/document/document-form/document-form.component";
import {GiroDataViewComponent} from "../../../shared/components/giro-menu-bar/giro-data-view.component";
import {BackyardDocumentListComponent} from "../../../shared/backyard-document-list/backyard-document-list.component";
import {
    ManagerBackyardDeclarationItemListContainerComponent
} from "./containers/manager-backyard-declaration-item-list-container/manager-backyard-declaration-item-list-container.component";
import {
    BackyardDeclarationItemListComponent
} from "../../shared/components/backyard-declaration-item-list/backyard-declaration-item-list.component";
import {EmptyImageComponent} from "../../shared/components/empty-image/empty-image.component";
import {HasAnyRolePipeModule} from "../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {MilligramsPipe} from '../../../shared/pipes/milligrams/milligrams.pipe';

export const routes: Routes = [
    {
        path: '',
        component: ManagerBackyardDeclarationRequestListPageComponent,
    },
    {
      data: {
        breadcrumb: '-'
      },
      path: 'view/:id',
      component: ManagerBackyardDeclarationViewPageComponent,
    },
];

@NgModule({
    declarations: [
        ManagerBackyardDeclarationItemListContainerComponent,
        ManagerBackyardDeclarationViewPageComponent,
        ManagerBackyardDocumentListContainerComponent,
        ManagerBackyardDocumentCreateContainerComponent,
        ManagerBackyardDeclarationRequestListPageComponent
    ],
    providers: [DecimalPipe, MilligramsPipe],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppCardModule,
        AppDefaultColumnSeparatorGridModule,
        AppFilterModule,
        AppPaginatorModule,
        ButtonModule,
        DeclarationStatusesComponent,
        LoaderServiceModule,
        SharedModule,
        TableModule,
        BackyardDeclarationRequestListComponent,
        AppToolbarModule,
        AppButtonModule,
        BackyardDeclarationDataComponent,
        DocumentFormComponent,
        GiroDataViewComponent,
        BackyardDocumentListComponent,
        BackyardDeclarationItemListComponent,
        EmptyImageComponent,
        HasAnyRolePipeModule,
    ]
})
export class ManagerBackyardModule {
}
