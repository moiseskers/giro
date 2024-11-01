import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {EvaluationListPageComponent} from "./pages/evaluation-list-page/evaluation-list-page.component";
import {
    EvaluationDetailsListPageComponent
} from "./pages/evaluation-details-page/evaluation-details-list-page.component";
import {EvaluationViewComponent} from "./pages/evaluation-view-page/evaluation-view.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
            path: '',
            component: EvaluationListPageComponent,
        },
            {
                data: {
                    breadcrumb: '-'
                },
                path: 'evaluation-details/:id',
                component: EvaluationDetailsListPageComponent,
         },
            {
                data: {
                    breadcrumb: '-'
                },
                path: 'evaluation-details/view/:biddingId/:applicationId',
                component: EvaluationViewComponent,
            },
    ])],
    exports: [RouterModule]
})
export class EvaluationRoutingModule {
}
