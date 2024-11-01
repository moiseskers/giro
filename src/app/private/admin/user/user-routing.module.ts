import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UserListPageComponent} from "./pages/user-list/user-list-page.component";
import {UserViewComponent} from "./pages/view-user/user-view.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: UserListPageComponent,
            },
            {
                data: {
                    breadcrumb: '-'
                },
                path: 'view/:id',
                component: UserViewComponent,
            },
        ])],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
