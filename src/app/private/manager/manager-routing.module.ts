import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                data: { breadcrumb: 'Empresa' },
                path: 'organization/pages', loadChildren: () => import('./organization/manager-organization.module').then((m) => m.ManagerOrganizationModule)
            },
            {
                data: { breadcrumb: 'Licitaciones' },
                path: 'bidding/pages', loadChildren: () => import('./bidding/manager-bidding.module').then((m) => m.ManagerBiddingModule)
            },
            {
                data: { breadcrumb: 'Mis postulaciones' },
                path: 'applications/pages', loadChildren: () => import('./application/application.module').then((m) => m.ApplicationModule)
            },
            {
                data: {breadcrumb: 'Gestión de patio trasero'},
                path: 'manager-backyard/pages',
                loadChildren: () => import('./manager-backyard/manager-backyard.module').then((m) => m.ManagerBackyardModule)
            },
            {
                data: {breadcrumb: 'Facturas'},
                path: 'manager-invoice/pages',
                loadChildren: () => import('./manager-invoice/manager-invoice.module').then((m) => m.ManagerInvoiceModule)
            },

        ], )
    ],
    exports: [RouterModule]
})
export class ManagerRoutingModule {
}

