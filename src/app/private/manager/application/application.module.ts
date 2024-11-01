import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {
    ManagerApplicationListPageComponent
} from "./pages/manager-application-list-page/manager-application-list-page.component";
import {
    ManagerApplicationViewPageComponent
} from "./pages/manager-application-view-page/manager-application-view-page.component";

export const routes: Routes = [
    {
        path: '',
        component: ManagerApplicationListPageComponent,
    },
    {
        data: {
            breadcrumb: '-'
        },
        path: 'view/:id',
        component: ManagerApplicationViewPageComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export class ApplicationModule {
}
