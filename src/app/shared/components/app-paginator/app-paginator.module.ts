import {NgModule} from '@angular/core';
import {AppPaginatorComponent} from './app-paginator.component';
import {CommonModule} from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
    imports: [
        CommonModule,
        PaginatorModule,
        PaginatorModule
    ],
    exports: [AppPaginatorComponent],
    declarations: [AppPaginatorComponent],
})
export class AppPaginatorModule {
}
