import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogService} from "primeng/dynamicdialog";
import {RouterModule, Routes} from "@angular/router";
import {
    DeclarationRequestListComponent
} from "../shared/components/declaration-request-list/declaration-request-list.component";
import {AppPaginatorModule} from "../../shared/components/app-paginator";
import {AppDefaultColumnSeparatorGridModule} from "../../shared/components/app-default-column-separator-grid";
import {AppFilterModule} from "../../shared/components/app-filter";
import {AppCardModule} from "../../shared/components/app-card";
import {LoaderServiceModule} from "../../shared/services/loader";
import {
    DeclarationProducerListComponent
} from "./producer-declaration/components/declaration-producer-list/declaration-producer-list.component";

export const routes: Routes = [
    {
        data: { breadcrumb: 'Empresa' },
        path: 'organization/pages', loadChildren: () => import('./organization/producer-organization.module').then((m) => m.ProducerOrganizationModule)
    },
    {
        data: { breadcrumb: 'Declaración de toneladas' },
        path: 'mass/pages', loadChildren: () => import('./producer-declaration/producer-declaration.module').then((m) => m.ProducerDeclarationModule)
    },
    {
        data: { breadcrumb: 'Materiales' },
        path: 'materials/pages', loadChildren: () => import('./producer-material/producer-material.module').then((m) => m.ProducerMaterialModule)
    },
    {
        data: {breadcrumb: 'Panel de información GIRO'},
        path: 'dashboard/pages',
        loadChildren: () => import('./producer-dashboard/producer-dashboard.module').then((m) => m.ProducerDashboardModule)
    },
    {
        data: {breadcrumb: 'Metas y toneladas'},
        path: 'goals-tons/page',
        loadChildren: () => import('./producer-goals-tons/producer-goals-tons.module').then((m) => m.ProducerGoalsTonsModule)
    },
    {
        data: {breadcrumb: 'Toneladas gestionadas en pátio trasero'},
        path: 'tons-managed/pages',
        loadChildren: () => import('./producer-tons-managed/producer-tons-managed.module').then((m) => m.ProducerTonsManagedModule)
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DeclarationRequestListComponent,
        AppPaginatorModule,
        AppDefaultColumnSeparatorGridModule,
        AppFilterModule,
        AppCardModule,
        LoaderServiceModule,
        DeclarationProducerListComponent,
    ],
    providers: [
        DialogService
        // {provide: HTTP_INTERCEPTORS, useClass: KeycloakInterceptor, multi: true} // Register the interceptor
    ]
})
export class ProducerModule {
}
