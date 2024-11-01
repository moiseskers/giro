import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                data: {breadcrumb: 'Entidades'},
                path: 'organization/pages',
                loadChildren: () => import('./organization/organization.module').then((m) => m.OrganizationModule)
            },
            {
                data: {breadcrumb: 'Usuarios'},
                path: 'user/pages', loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
            },
            {
                data: {breadcrumb: 'Licitaciones'},
                path: 'bidding/pages',
                loadChildren: () => import('./bidding/bidding.module').then((m) => m.BiddingModule)
            },
            {
                data: {breadcrumb: 'Evaluación'},
                path: 'evaluation/pages',
                loadChildren: () => import('./evaluation/evaluation.module').then((m) => m.EvaluationModule)
            },
            {
                data: {breadcrumb: 'Declaración de toneladas'},
                path: 'mass/pages',
                loadChildren: () => import('./declaration-request/declaration-request.module').then((m) => m.DeclarationRequestModule)
            },
            {
                data: { breadcrumb: 'CIG' },
                path: 'cig/pages', loadChildren: () => import('./cig/cig.module').then((m) => m.CigModule)

            },
            {
                data: {breadcrumb: 'Gestión de patio trasero'},
                path: 'backyard/pages',
                loadChildren: () => import('./backyard-declaration-request/backyard-declaration-request.module').then((m) => m.BackyardDeclarationRequestModule)
            },
            {
                data: {breadcrumb: 'Facturas'},
                path: 'invoice/pages',
                loadChildren: () => import('./invoice/invoice.module').then((m) => m.InvoiceModule)
            },
            {
                data: {breadcrumb: 'Stock'},
                path: 'stock/pages',
                loadChildren: () => import('./stock/stock.module').then((m) => m.StockModule)
            },
            {
                data: {breadcrumb: 'Matching'},
                path: 'matching/pages',
                loadChildren: () => import('./matching/matching.module').then((m) => m.MatchingRequestModule)
            },
            {
                data: {breadcrumb: 'Panel de información GIRO'},
                path: 'dashboard/pages',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                data: {breadcrumb: 'Metas y toneladas'},
                path: 'goals-tons/page',
                loadChildren: () => import('./goals-tons/goals-tons.module').then((m) => m.GoalsTonsModule)
            },
            {
                data: {breadcrumb: 'Toneladas gestionadas en pátio trasero'},
                path: 'tons-managed/pages',
                loadChildren: () => import('./tons-managed/tons-managed.module').then((m) => m.TonsManagedModule)
            },
            {
                data: {breadcrumb: 'Materiales'},
                path: 'materials/pages',
                loadChildren: () => import('./admin-material/admin-material.module').then((m) => m.AdminMaterialModule)
            },
        ],)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}

