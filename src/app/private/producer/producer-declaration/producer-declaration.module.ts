import {NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {
    ProducerDeclarationListPageComponent
} from "./pages/declaration-list-page/producer-declaration-list-page.component";
import {
    ProducerDeclarationViewPageComponent
} from "./pages/producer-declaration-view-page/producer-declaration-view-page.component";
import {
    DeclarationStatusesComponent
} from "../../shared/components/declaration-statuses/declaration-statuses.component";
import {AppToolbarModule} from "../../../shared/components/toolbar/toolbar";
import {AppCardModule} from "../../../shared/components/app-card";
import {AppButtonModule} from "../../../shared/components/button/button";
import {
    ProducerDeclarationItemListContainerComponent
} from "./containers/producer-declaration-item-list-container/producer-declaration-item-list-container.component";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {
    DeclarationItemListComponent
} from "../../shared/components/declaration-item-list/declaration-item-list.component";
import {EmptyImageComponent} from "../../shared/components/empty-image/empty-image.component";
import {GiroDataViewComponent} from "../../../shared/components/giro-menu-bar/giro-data-view.component";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {
    DeclarationProducerListComponent
} from "./components/declaration-producer-list/declaration-producer-list.component";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {
    ProducerDeclarationContainerEditComponent
} from "./containers/producer-declaration-container-edit/producer-declaration-container-edit.component";
import {
    DeclarationTableFormComponent
} from "../../shared/components/tons-declaration-table-form/declaration-table-form.component";
import {ProducerDeclarationDataComponent} from "./components/declaration-data/producer-declaration-data.component";
import {MessagesModule} from "primeng/messages";
import {AppViewDataComponent} from "../../../shared/components/app-view-data/app-view-data.component";
import {
    ProducerDeclarationContainerCreateComponent
} from "./containers/producer-declaration-container-create/producer-declaration-container-create.component";
import { MenuModule } from 'primeng/menu';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { GiroUploadComponent } from 'src/app/shared/components/upload/giro-upload.component';
import { ProducerMassDeclarationComponent } from './containers/producer-mass-declaration/producer-mass-declaration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProduderDeclarationService } from './services/producer-declaration.service';

export const routes: Routes = [
    {
        path: '',
        component: ProducerDeclarationListPageComponent,
    },
    {
        data: {
            breadcrumb: '-'
        },
        path: 'view/:id',
        component: ProducerDeclarationViewPageComponent,
    },
];

@NgModule({
    declarations: [ProducerDeclarationContainerCreateComponent, ProducerDeclarationDataComponent, ProducerDeclarationListPageComponent, ProducerDeclarationViewPageComponent, ProducerDeclarationItemListContainerComponent, ProducerDeclarationContainerEditComponent, ProducerMassDeclarationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DeclarationStatusesComponent,
        AppToolbarModule,
        AppCardModule,
        AppButtonModule,
        AppPaginatorModule,
        DeclarationItemListComponent,
        EmptyImageComponent,
        GiroDataViewComponent,
        AppFilterModule,
        DeclarationProducerListComponent,
        AppDefaultColumnSeparatorGridModule,
        LoaderServiceModule,
        DeclarationTableFormComponent,
        MessagesModule,
        AppViewDataComponent,
        MenuModule,
        ChevronDownIcon,
        GiroUploadComponent,
        ReactiveFormsModule,
        ButtonModule
    ],
    providers: [TitleCasePipe, ProduderDeclarationService]
})
export class ProducerDeclarationModule {
}
