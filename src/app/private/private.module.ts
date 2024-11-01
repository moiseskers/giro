import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrivateRoutingModule} from "./private-routing.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrivateRoutingModule,
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: KeycloakInterceptor, multi: true} // Register the interceptor
  ]
})
export class PrivateModule { }
