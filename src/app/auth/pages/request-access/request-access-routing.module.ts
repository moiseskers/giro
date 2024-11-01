import {RouterModule} from '@angular/router';
import {RequestAccessPageEmailComponent} from "./pages/request-access-email-page/request-access-email-page.component";
import {NgModule} from "@angular/core";
import {RequestAccessComponent} from "./pages/request-access-page/request-access.component";
import {RequestAccessPage1Component} from "./pages/request-access-1-page/request-access-1-page.component";
import {RequestAccessPage2Component} from "./pages/request-access-2-page/request-access-2-page.component";
import {RequestAccessPage3Component} from "./pages/request-access-3-page/request-access-3-.component";
import {RequestSuccessPageComponent} from "./pages/request-success-page/request-success-page.component";
import {StepsComponent} from "./component/steps/steps.component";
import {TermsOfUsePageComponent} from './pages/terms-of-use-page/terms-of-use-page.component';

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: '',
            component: RequestAccessComponent,
            children: [
                {
                    path: 'email',
                    component: RequestAccessPageEmailComponent
                },

                {
                    path: 'steps',
                    component: StepsComponent,
                    children: [
                        {
                            path: '1',
                            component: RequestAccessPage1Component
                        },
                        {
                            path: '2',
                            component: RequestAccessPage2Component
                        },
                        {
                            path: '3',
                            component: RequestAccessPage3Component
                        },
                    ]
                },
                {
                    path: 'success',
                    component: RequestSuccessPageComponent
                },
                {
                    path: 'terms-of-use',
                    component: TermsOfUsePageComponent
                },
            ]
        },
    ])],
    exports: [RouterModule]
})
export class RequestAccessRoutingModule {
}
