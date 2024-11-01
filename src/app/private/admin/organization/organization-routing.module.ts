import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListOrganizationsPageComponent} from "./pages/organizations-list/list-organizations-page.component";
import {ViewOrganizationComponent} from "./pages/organization-view/view-organization.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
            path: '',
            component: ListOrganizationsPageComponent,

        }, {
                data: {
                    breadcrumb: '-'
                },
                path: 'view/:id',
                component: ViewOrganizationComponent,
                runGuardsAndResolvers: 'always',
         },
    ])],
    exports: [RouterModule]
})
export class OrganizationRoutingModule {
}
