import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ManagerInvoiceListPageComponent} from './pages/manager-invoice-list-page/manager-invoice-list-page.component';
import {AppCardModule} from '../../../shared/components/app-card';
import {AppDefaultColumnSeparatorGridModule} from '../../../shared/components/app-default-column-separator-grid';
import {AppFilterModule} from '../../../shared/components/app-filter';
import {AppPaginatorModule} from '../../../shared/components/app-paginator';
import {Button} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ManagerInvoiceService} from './services/manager-invoice.service';
import {
    ManagerInvoiceDocumentCreateContainerComponent
} from './containers/manager-invoice-document-create-container/manager-invoice-document-create-container.component';
import {DocumentFormComponent} from '../../shared/components/document/document-form/document-form.component';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

export const routes: Routes = [
  {
    path: '',
    component: ManagerInvoiceListPageComponent,
  },
];

@NgModule({
  declarations: [
    ManagerInvoiceListPageComponent,
    ManagerInvoiceDocumentCreateContainerComponent
  ],
  providers: [ManagerInvoiceService, DynamicDialogRef],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppCardModule,
    AppDefaultColumnSeparatorGridModule,
    AppFilterModule,
    AppPaginatorModule,
    Button,
    MenuModule,
    PrimeTemplate,
    TableModule,
    DocumentFormComponent,
  ]
})
export class ManagerInvoiceModule { }
