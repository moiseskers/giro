import {NgModule} from '@angular/core';
import {AppDefaultCenterGridComponent} from './app-default-center-grid.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [AppDefaultCenterGridComponent],
    declarations: [AppDefaultCenterGridComponent],
    providers: [],
})
export class AppDefaultCenterGridModule {
}
