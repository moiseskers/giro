import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogService} from "primeng/dynamicdialog";
import {RouterModule, Routes} from "@angular/router";

export const routes: Routes = [
    {
        data: { breadcrumb: 'Empresa' },
        path: 'organization/pages', loadChildren: () => import('./organization/city-organization.module').then((m) => m.CityOrganizationModule)
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
export class CityModule {
}
