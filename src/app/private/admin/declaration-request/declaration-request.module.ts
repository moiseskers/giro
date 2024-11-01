import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {
    DeclarationRequestListPageComponent
} from "./pages/declaration-request-list-page/declaration-request-list-page.component";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppCardModule} from "../../../shared/components/app-card";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {
    DeclarationRequestListComponent
} from "../../shared/components/declaration-request-list/declaration-request-list.component";
import {DialogService} from "primeng/dynamicdialog";
import {
    DeclarationRequestViewPageComponent
} from "./pages/declaration-request-view-page/declaration-request-view-page.component";
import {AppButtonModule} from "../../../shared/components/button/button";
import {AppToolbarModule} from "../../../shared/components/toolbar/toolbar";
import {ChevronDownIcon} from "primeng/icons/chevrondown";
import {GeneralInformationComponent} from "../../shared/components/general-information/general-information.component";
import {MenuModule} from "primeng/menu";
import {ProcessFileModule} from "../../shared/components/process-files/process-file.module";
import {SharedModule} from "primeng/api";
import {TagModule} from "primeng/tag";
import {
    DeclarationRequestStatusesComponent
} from "../../shared/components/declaration-request-statuses/declaration-request-statuses.component";
import {ButtonModule} from "primeng/button";
import {
    DeclarationRequestDataComponent
} from "./components/declaration-request-data/declaration-request-data.component";
import {DeclarationListComponent} from "./components/declaration-list/declaration-list.component";
import {
    DeclarationListContainerComponent
} from "./containers/declaration-list-container/declaration-list-container.component";
import {
    DeclarationRequestDetailViewPageComponent
} from "./pages/declaration-request-detail-view-page/declaration-request-detail-view-page.component";
import {
    DeclarationHistoryListContainerComponent
} from "./containers/declaration-history-list-container/declaration-history-list-container.component";
import {GiroDataViewComponent} from "../../../shared/components/giro-menu-bar/giro-data-view.component";
import {
    DeclarationHistoryListComponent
} from "./components/declaration-history-list/declaration-history-list.component";
import {EmptyImageComponent} from "../../shared/components/empty-image/empty-image.component";
import {
    DeclarationContainerEditComponent
} from "./containers/declaration-item-edit-container/declaration-container-edit.component";
import {
    DeclarationTableFormComponent
} from "../../shared/components/tons-declaration-table-form/declaration-table-form.component";
import {
    DeclarationItemListContainerComponent
} from "./containers/declaration-item-list-container/declaration-item-list-container.component";
import {
    DeclarationItemListComponent
} from "../../shared/components/declaration-item-list/declaration-item-list.component";
import {
    DeclarationRequestCreateContainerComponent
} from "./containers/declaration-request-create-container/declaration-request-create-container.component";
import {
    DeclarationRequestFormComponent
} from "../../shared/components/declaration-request-form/declaration-request-form.component";
import {
    DeclarationRequestEditContainerComponent
} from "./containers/declaration-request-edit-container/declaration-request-edit-container.component";
import {
    DeclarationStatusesComponent
} from "../../shared/components/declaration-statuses/declaration-statuses.component";
import {
    OrganizationDeclarationDataComponent
} from "./components/organization-declaration-data/organization-declaration-data.component";
import {SkeletonComponent} from '../../../shared/components/skeleton/skeleton.component';
import {
    DeclarationContainerCreateComponent
} from './containers/declaration-item-create-container/declaration-container-create.component';
import {ToBooleanV2Pipe} from '../../../shared/services/loader/to-booleanV2.pipe';

export const DECLARATION_TYPE = new InjectionToken<string>('DECLARATION_TYPE');

export const routes: Routes = [
    {
        path: '',
        component: DeclarationRequestListPageComponent,
    },
    {
        data: {
            breadcrumb: '-'
        },
        path: 'view/:id',
        component: DeclarationRequestViewPageComponent,
    },
    {
        data: {
            breadcrumb: '-'
        },
        path: 'view/:id/detail/:declarationId',
        component: DeclarationRequestDetailViewPageComponent,
    },
];

@NgModule({
    declarations: [
        DeclarationHistoryListContainerComponent,
        DeclarationRequestListPageComponent,
        DeclarationContainerEditComponent,
        DeclarationItemListContainerComponent,
        DeclarationRequestEditContainerComponent,
        DeclarationListContainerComponent,
        DeclarationRequestCreateContainerComponent,
        DeclarationRequestDetailViewPageComponent,
        DeclarationRequestViewPageComponent,
        DeclarationContainerCreateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppDefaultColumnSeparatorGridModule,
        AppPaginatorModule,
        AppFilterModule,
        AppCardModule,
        LoaderServiceModule,
        DeclarationRequestListComponent,
        AppButtonModule,
        AppToolbarModule,
        ChevronDownIcon,
        GeneralInformationComponent,
        MenuModule,
        ProcessFileModule,
        SharedModule,
        TagModule,
        DeclarationRequestStatusesComponent,
        ButtonModule,
        DeclarationRequestDataComponent,
        DeclarationListComponent,
        GiroDataViewComponent,
        DeclarationHistoryListComponent,
        EmptyImageComponent,
        DeclarationTableFormComponent,
        DeclarationItemListComponent,
        DeclarationRequestFormComponent,
        DeclarationStatusesComponent,
        OrganizationDeclarationDataComponent,
        SkeletonComponent,
        ToBooleanV2Pipe,
    ],
    providers: [DialogService, TitleCasePipe,  { provide: DECLARATION_TYPE, useValue: 'PRODUCER_DECLARATION' }]
})
export class DeclarationRequestModule {
}
