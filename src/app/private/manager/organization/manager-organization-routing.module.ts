import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ManagerViewOrganizationComponent} from "./pages/organization-view/manager-view-organization.component";

@NgModule({
    imports: [
        RouterModule.forChild([{
                path: 'view/:id',
                component: ManagerViewOrganizationComponent,
                runGuardsAndResolvers: 'always',
         },
    ])],
    exports: [RouterModule]
})
export class ManagerOrganizationRoutingModule {
}
