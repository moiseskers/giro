import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    IndustrialConsumerMaterialPageComponent
} from './pages/industrial-consumer-material-page/industrial-consumer-material-page.component';
import {AppToolbarModule} from '../../../shared/components/toolbar/toolbar';
import {AppCardModule} from '../../../shared/components/app-card';
import {Button, ButtonDirective} from 'primeng/button';
import {RouterModule, Routes} from '@angular/router';
import {ToolbarModule} from 'primeng/toolbar';
import {AddSymbolPipe} from '../../../shared/pipes/add-symbol/add-symbol.pipe';
import {AppCounterCardComponent} from '../../../shared/components/app-counter-card/app-counter-card.component';
import {GiroDataViewV2Component} from '../../../shared/components/giro-menu-barv2/giro-data-view-v2.component';
import {MilligramsPipe} from '../../../shared/pipes/milligrams/milligrams.pipe';
import {SkeletonComponent} from '../../../shared/components/skeleton/skeleton.component';
import {AppFilterV2Component} from '../../../shared/components/app-filter-v2/app-filter-v2.component';
import {Ripple} from 'primeng/ripple';
import {CardModule} from 'primeng/card';
import {MaterialSearchBarComponent} from '../../shared/components/material-search-bar/material-search-bar.component';
import {ByteArkPlayerContainer} from '@byteark/byteark-player-angular';
import {VideoCardComponent} from '../../shared/components/video-card/video-card.component';
import {AppPaginatorModule} from '../../../shared/components/app-paginator';
import {ToBooleanV2Pipe} from '../../../shared/services/loader/to-booleanV2.pipe';
import {DialogService} from 'primeng/dynamicdialog';
import {TableModule} from 'primeng/table';
import {
    IndustrialConsumerMaterialMediaLinkListContainerComponent
} from './containers/industrial-consumer-material-media-link-list-container/industrial-consumer-material-media-link-list-container.component';
import {
    IndustrialConsumerMaterialDocumentListContainerComponent
} from './containers/industrial-consumer-material-document-list-container/industrial-consumer-material-document-list-container.component';
import {
    MaterialDocumentListComponent
} from '../../shared/components/material-document-list/material-document-list.component';

export const routes: Routes = [
    {
        path: '',
        component: IndustrialConsumerMaterialPageComponent,
    },
];

@NgModule({
    providers: [DialogService],
    declarations: [
        IndustrialConsumerMaterialDocumentListContainerComponent,
        IndustrialConsumerMaterialPageComponent,
        IndustrialConsumerMaterialMediaLinkListContainerComponent,
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
        ToBooleanV2Pipe,
        TableModule,
        VideoCardComponent,
        MaterialDocumentListComponent,
    ]
})
export class IndustrialConsumerMaterialModule {
}
