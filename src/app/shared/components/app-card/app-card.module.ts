import {NgModule} from '@angular/core';
import {AppCardComponent} from './app-card.component';
import {CommonModule} from '@angular/common';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        MenuModule,
        ButtonModule
    ],
    exports: [AppCardComponent],
    declarations: [AppCardComponent],
    providers: [],
})
export class AppCardModule {
}
