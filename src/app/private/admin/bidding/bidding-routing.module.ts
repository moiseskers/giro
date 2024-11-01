import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BiddingListPageComponent} from "./pages/bidding-list/bidding-list-page.component";
import {BiddingViewComponent} from "./pages/bidding-view/bidding-view.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
            path: '',
            component: BiddingListPageComponent,
        },
            {
                data: {
                    breadcrumb: '-'
                },
                path: 'view/:id',
                component: BiddingViewComponent,
         },
    ])],
    exports: [RouterModule]
})
export class BiddingRoutingModule {
}
