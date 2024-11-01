import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogService} from "primeng/dynamicdialog";
import {RouterModule, Routes} from "@angular/router";

export const routes: Routes = [
    {
        data: { breadcrumb: 'Empresa' },
        path: 'organization/pages', loadChildren: () => import('./organization/industrial-consumer-organization.module').then((m) => m.IndustrialConsumerOrganizationModule)
    },
    {
        data: { breadcrumb: 'Gestión de patio trasero' },
        path: 'backyard/pages', loadChildren: () => import('./industrial-consumer-backyard-declaration/industrial-consumer-backyard-declaration.module').then((m) => m.IndustrialConsumerBackyardDeclarationModule)
    },
    {
        data: { breadcrumb: 'Materiales' },
        path: 'materials/pages', loadChildren: () => import('./industrial-consumer-material/industrial-consumer-material.module').then((m) => m.IndustrialConsumerMaterialModule)
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        DialogService,
        // {provide: HTTP_INTERCEPTORS, useClass: KeycloakInterceptor, multi: true} // Register the interceptor
    ]
})
export class IndustrialConsumerModule {
}
