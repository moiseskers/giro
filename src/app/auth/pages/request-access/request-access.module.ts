import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestAccessPageEmailComponent} from "./pages/request-access-email-page/request-access-email-page.component";
import {AppCardModule} from "../../../shared/components/app-card";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppDefaultCenterGridModule} from "../../../shared/components/app-default-center-grid";
import {ButtonModule} from "primeng/button";
import {AuthBasicLayoutComponent} from "../../components/auth-basic-layout/auth-basic-layout.component";
import {ChipsModule} from "primeng/chips";
import {RequestAccessRoutingModule} from "./request-access-routing.module";
import {RippleModule} from "primeng/ripple";
import {ReactiveFormsModule} from "@angular/forms";
import {FormErrorModule} from "../../../shared/components/form-error";
import {RequestAccessComponent} from "./pages/request-access-page/request-access.component";
import {ApiService} from "./services/api.service";
import {FocusFirstInvalidFieldModule} from "../../../shared/directives/focus-first-invalid-field";
import {RequestAccessPage1Component} from "./pages/request-access-1-page/request-access-1-page.component";
import {RequestAccessPage2Component} from "./pages/request-access-2-page/request-access-2-page.component";
import {RequestAccessPage3Component} from "./pages/request-access-3-page/request-access-3-.component";
import {TableModule} from "primeng/table";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {FileUploadModule} from "primeng/fileupload";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TextFinderPipeModule} from "../../../shared/pipes/text-finder/text-finder-pipe.module";
import {DocumentIdFinderPipe} from "./pipes/document-id-finder.pipe";
import {DocumentIdFilterPipe} from "./pipes/document-id-filter.pipe";
import {RequestSuccessPageComponent} from "./pages/request-success-page/request-success-page.component";
import {DividerModule} from "primeng/divider";
import {NgxMaskDirective} from "ngx-mask";
import {StepsComponent} from "./component/steps/steps.component";
import {StepsModule} from "../../../shared/components/steps/steps";
import {AppButtonModule} from "../../../shared/components/button/button";
import {ToUpperCaseDirective} from "../../../shared/directives/to-upper-case/to-upper-case.directive";
import {TermsOfUsePageComponent} from './pages/terms-of-use-page/terms-of-use-page.component';
import {SafePipe} from '../../../shared/pipes/safe/safe-pipe.pipe';
import {RedAsteriskDirective} from '../../../shared/directives/red-asterisk-directive/red-asterisk.directive';

@NgModule({
    declarations: [
        RequestAccessComponent,
        RequestAccessPageEmailComponent,
        RequestAccessPage1Component,
        RequestAccessPage2Component,
        RequestAccessPage3Component,
        RequestSuccessPageComponent,
        DocumentIdFinderPipe,
        DocumentIdFilterPipe,
        StepsComponent,
        TermsOfUsePageComponent
    ],
    providers: [ApiService],
    imports: [
        CommonModule,
        AppCardModule,
        AppDefaultColumnSeparatorGridModule,
        AppDefaultCenterGridModule,
        AuthBasicLayoutComponent,
        ChipsModule,
        ButtonModule,
        RequestAccessRoutingModule,
        RippleModule,
        ReactiveFormsModule,
        FormErrorModule,
        FocusFirstInvalidFieldModule,
        TableModule,
        LoaderServiceModule,
        FileUploadModule,
        ConfirmDialogModule,
        TextFinderPipeModule,
        DividerModule,
        NgxMaskDirective,
        StepsModule,
        AppButtonModule,
        ToUpperCaseDirective,
        SafePipe,
        RedAsteriskDirective,
    ]
})
export class RequestAccessModule {
}
