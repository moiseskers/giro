import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {InvoiceListPageComponent} from './pages/invoice-list-page/invoice-list-page.component';
import {AppCardModule} from "../../../shared/components/app-card";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {ButtonModule} from "primeng/button";
import {CigStatusesComponent} from "../cig/components/cig-statuses/cig-statuses.component";
import {MenuModule} from "primeng/menu";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {InvoiceStatusesComponent} from './components/invoice-statuses/invoice-statuses.component';
import {AdminInvoiceService} from './services/admin-invoice.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {LoaderServiceModule} from '../../../shared/services/loader';
import {
    InvoiceCreateContainerComponent
} from './containers/invoice-create-container/invoice-create-container.component';
import {InvoiceFormComponent} from './components/invoice-form/invoice-form.component';
import {AppCalendarModule} from '../../../shared/components/calendar/calendar';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {FocusFirstInvalidFieldModule} from '../../../shared/directives/focus-first-invalid-field';
import {FormErrorModule} from '../../../shared/components/form-error';
import {MultiSelectModule} from 'primeng/multiselect';
import {PaginatorModule} from '../../../shared/components/paginator/paginator';
import {ReactiveFormsModule} from '@angular/forms';
import {AppAutoCompleteModule} from '../../../shared/components/autocomplete/app-auto-complete.component';
import {GiroUploadComponent} from '../../../shared/components/upload/giro-upload.component';
import {CigFormComponent} from '../cig/components/cig-form/cig-form.component';
import {NgxMaskDirective} from 'ngx-mask';
import {ToUpperCaseDirective} from '../../../shared/directives/to-upper-case/to-upper-case.directive';
import {InvoiceItemTableForm} from './components/item-table-form/invoice-item-table-form.component';
import {InvoiceViewComponent} from './pages/invoice-view/invoice-view.component';
import {AppButtonModule} from '../../../shared/components/button/button';
import {AppToolbarModule} from '../../../shared/components/toolbar/toolbar';
import {ChevronDownIcon} from 'primeng/icons/chevrondown';
import {TagModule} from 'primeng/tag';
import {GeneralInformationComponent} from '../../shared/components/general-information/general-information.component';
import {ProcessFileModule} from '../../shared/components/process-files/process-file.module';
import {
    QuestionAndAnswersFormComponent
} from '../../shared/components/question-and-answers-form/question-and-answers-form.component';
import {
    DeclarationRequestStatusesComponent
} from '../../shared/components/declaration-request-statuses/declaration-request-statuses.component';
import {SkeletonModule} from 'primeng/skeleton';
import {AppViewDataComponent} from '../../../shared/components/app-view-data/app-view-data.component';
import {GiroDataViewComponent} from '../../../shared/components/giro-menu-bar/giro-data-view.component';
import {InvoiceDataContainerComponent} from './containers/invoice-data-container/invoice-data-container.component';
import {InvoiceDataComponent} from './components/invoice-data/invoice-data.component';
import {InvoiceEditContainerComponent} from './containers/invoice-edit-container/invoice-edit-container.component';
import {
    InvoiceItemListContainerComponent
} from './containers/invoice-item-list-container/invoice-item-list-container.component';
import {InvoiceItemListComponent} from './components/invoice-item-list/invoice-item-list.component';
import {
    InvoiceDocumentListContainerComponent
} from './containers/invoice-document-list-container/invoice-document-list-container.component';
import {DocumentListComponent} from '../../shared/components/document-list/document-list.component';
import {NgxCurrencyDirective} from 'ngx-currency';
import {ToBooleanV2Pipe} from '../../../shared/services/loader/to-booleanV2.pipe';
import {
    InvoiceDocumentCreateContainerComponent
} from './containers/invoice-document-create-container/invoice-document-create-container.component';
import {DocumentFormComponent} from '../../shared/components/document/document-form/document-form.component';
import {
    AppFilterWithLoaderComponent
} from '../../../shared/components/app-filter-with-loader/app-filter-with-loader.component';
import {RedAsteriskDirective} from '../../../shared/directives/red-asterisk-directive/red-asterisk.directive';

export const routes: Routes = [
    {
        path: '',
        component: InvoiceListPageComponent,
    },
    {
        data: {
            breadcrumb: '-'
        },
        path: 'view/:id',
        component: InvoiceViewComponent,
    },
    // {
    //   data: {
    //     breadcrumb: '-'
    //   },
    //   path: 'view/:id/detail/:declarationId',
    //   component: DeclarationRequestDetailViewPageComponent,
    // },
];


@NgModule({
    declarations: [
        InvoiceListPageComponent,
        InvoiceCreateContainerComponent,
        InvoiceFormComponent,
        InvoiceViewComponent,
        InvoiceDataContainerComponent,
        InvoiceEditContainerComponent,
        InvoiceItemListContainerComponent,
        InvoiceDocumentListContainerComponent,
        InvoiceDocumentCreateContainerComponent,
    ],
    providers: [AdminInvoiceService, DialogService, DecimalPipe, DynamicDialogRef],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCardModule,
        AppDefaultColumnSeparatorGridModule,
        AppFilterModule,
        AppPaginatorModule,
        ButtonModule,
        CigStatusesComponent,
        MenuModule,
        SharedModule,
        TableModule,
        InvoiceStatusesComponent,
        LoaderServiceModule,
        AppCalendarModule,
        DividerModule,
        DropdownModule,
        FocusFirstInvalidFieldModule,
        FormErrorModule,
        MultiSelectModule,
        PaginatorModule,
        ReactiveFormsModule,
        AppAutoCompleteModule,
        GiroUploadComponent,
        NgxCurrencyDirective,
        CigFormComponent,
        NgxMaskDirective,
        ToUpperCaseDirective,
        InvoiceItemTableForm,
        AppButtonModule,
        AppToolbarModule,
        ChevronDownIcon,
        TagModule,
        GeneralInformationComponent,
        ProcessFileModule,
        QuestionAndAnswersFormComponent,
        DeclarationRequestStatusesComponent,
        SkeletonModule,
        AppViewDataComponent,
        GiroDataViewComponent,
        InvoiceDataComponent,
        InvoiceItemListComponent,
        DocumentListComponent,
        ToBooleanV2Pipe,
        DocumentFormComponent,
        AppFilterWithLoaderComponent,
        RedAsteriskDirective,
    ]
})
export class InvoiceModule {
}
