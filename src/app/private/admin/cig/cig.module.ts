import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CigListPageComponent} from "./pages/cig-list-page/cig-list-page.component";
import {AppCardModule} from "../../../shared/components/app-card";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {
    DeclarationRequestListComponent
} from "../../shared/components/declaration-request-list/declaration-request-list.component";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {ButtonModule} from "primeng/button";
import {
    DeclarationRequestStatusesComponent
} from "../../shared/components/declaration-request-statuses/declaration-request-statuses.component";
import {HasAnyRolePipeModule} from "../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {MenuModule} from "primeng/menu";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {CigStatusesComponent} from "./components/cig-statuses/cig-statuses.component";
import {RouterModule, Routes} from "@angular/router";
import {CigService} from "./services/cig.service";
import {CigCreateContainerComponent} from "./containers/cig-create-container/cig-create-container.component";
import {DialogService} from "primeng/dynamicdialog";
import {CigFormComponent} from "./components/cig-form/cig-form.component";

export const routes: Routes = [
    {
        path: '',
        component: CigListPageComponent,
    },
    // {
    //     data: {
    //         breadcrumb: '-'
    //     },
    //     path: 'view/:id',
    //     component: DeclarationRequestViewPageComponent,
    // }
];


@NgModule({
    declarations: [CigListPageComponent, CigCreateContainerComponent],
    providers: [CigService, DialogService],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppCardModule,
        AppDefaultColumnSeparatorGridModule,
        AppFilterModule,
        AppPaginatorModule,
        DeclarationRequestListComponent,
        LoaderServiceModule,
        ButtonModule,
        DeclarationRequestStatusesComponent,
        HasAnyRolePipeModule,
        MenuModule,
        SharedModule,
        TableModule,
        CigStatusesComponent,
        CigFormComponent
    ]
})
export class CigModule {
}
