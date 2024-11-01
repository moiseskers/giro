import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerRoutingModule} from "./manager-routing.module";
import {DialogService} from "primeng/dynamicdialog";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ManagerRoutingModule,
    ],
    providers: [
        DialogService,
        // {provide: HTTP_INTERCEPTORS, useClass: KeycloakInterceptor, multi: true} // Register the interceptor
    ]
})
export class ManagerModule {
}
