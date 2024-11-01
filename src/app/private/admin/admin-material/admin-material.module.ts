import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialPageComponent} from './pages/material-page/material-page.component';
import {AppToolbarModule} from '../../../shared/components/toolbar/toolbar';
import {AppCardModule} from '../../../shared/components/app-card';
import {Button, ButtonDirective} from 'primeng/button';
import {RouterModule, Routes} from '@angular/router';
import {ToolbarModule} from 'primeng/toolbar';
import {AddSymbolPipe} from '../../../shared/pipes/add-symbol/add-symbol.pipe';
import {AppCounterCardComponent} from '../../../shared/components/app-counter-card/app-counter-card.component';
import {
    DateAndActionButtonComponent
} from '../../shared/components/date-and-action-button/date-and-action-button.component';
import {GiroDataViewV2Component} from '../../../shared/components/giro-menu-barv2/giro-data-view-v2.component';
import {MilligramsPipe} from '../../../shared/pipes/milligrams/milligrams.pipe';
import {SkeletonComponent} from '../../../shared/components/skeleton/skeleton.component';
import {AppFilterV2Component} from '../../../shared/components/app-filter-v2/app-filter-v2.component';
import {Ripple} from 'primeng/ripple';
import {CardModule} from 'primeng/card';
import {MaterialSearchBarComponent} from '../../shared/components/material-search-bar/material-search-bar.component';
import {ByteArkPlayerContainer} from '@byteark/byteark-player-angular';
import {AppPaginatorModule} from '../../../shared/components/app-paginator';
import {
    AllowedOrganizationTypesComponent
} from './components/allowed-organization-types/allowed-organization-types.component';
import {
    MaterialMediaLinkCreateContainerComponent
} from './containers/material-media-link-create-container/material-media-link-create-container.component';
import {MaterialMediaLinkFormComponent} from './components/material-form/material-media-link-form.component';
import {ToBooleanV2Pipe} from '../../../shared/services/loader/to-booleanV2.pipe';
import {DialogService} from 'primeng/dynamicdialog';
import {TableModule} from 'primeng/table';
import {
    MaterialMediaLinkListContainerComponent
} from './containers/material-media-link-list-container/material-media-link-list-container.component';
import {
    MaterialDocumentListContainerComponent
} from './containers/material-document-list-container/material-document-list-container.component';
import {
    MaterialDocumentListComponent
} from '../../shared/components/material-document-list/material-document-list.component';
import {
    MaterialDocumentCreateContainerComponent
} from './containers/material-document-create-container/material-document-create-container.component';
import {MaterialDocumentFormComponent} from './components/material-document-form/material-document-form.component';
import {VideoCardComponent} from '../../shared/components/video-card/video-card.component';

export const routes: Routes = [
    {
        path: '',
        component: MaterialPageComponent,
    },
];

@NgModule({
    providers: [DialogService],
    declarations: [
        MaterialPageComponent,
        MaterialMediaLinkCreateContainerComponent,
        MaterialMediaLinkListContainerComponent,
        MaterialDocumentListContainerComponent,
        MaterialDocumentCreateContainerComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppToolbarModule,
        AppCardModule,
        Button,
        ToolbarModule,
        AddSymbolPipe,
        AppCounterCardComponent,
        DateAndActionButtonComponent,
        GiroDataViewV2Component,
        MilligramsPipe,
        SkeletonComponent,
        AppFilterV2Component,
        Ripple,
        ButtonDirective,
        CardModule,
        MaterialSearchBarComponent,
        ByteArkPlayerContainer,
        AppPaginatorModule,
        AllowedOrganizationTypesComponent,
        ToBooleanV2Pipe,
        MaterialMediaLinkFormComponent,
        TableModule,
        MaterialDocumentListComponent,
        MaterialDocumentFormComponent,
        VideoCardComponent
    ]
})
export class AdminMaterialModule {
}
