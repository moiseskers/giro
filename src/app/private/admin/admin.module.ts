import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AdminRoutingModule,
    ],
    providers: [
        // {provide: HTTP_INTERCEPTORS, useClass: KeycloakInterceptor, multi: true} // Register the interceptor
    ]
})
export class AdminModule {
}
