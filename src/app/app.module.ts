import {APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppLayoutModule} from './layout/app.layout.module';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {ErrorHandlerService} from "./core/services/error-handler.service";
import {DefaultSystemMessageServiceModule,} from "./shared/components/defaut-system-message-service";
import {AppToastModule} from "./shared/components/app-toast";
import {initializer} from "./app-init";
import {NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule} from "ngx-ui-loader";
import {provideNgxMask} from "ngx-mask";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {KeycloakInterceptor} from "./core/interceptors/keycloak-interceptor";
import localeEsCL from '@angular/common/locales/es-CL';
import {registerLocaleData} from "@angular/common";
import {
    DeclarationTableFormComponent
} from "./private/shared/components/tons-declaration-table-form/declaration-table-form.component";
import {SkeletonModule} from 'primeng/skeleton';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {AppCalendarModule} from './shared/components/calendar/calendar';

registerLocaleData(localeEsCL);

@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,

        BrowserAnimationsModule,

        AppRoutingModule,
        AppLayoutModule,
        KeycloakAngularModule,

        LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),

        DefaultSystemMessageServiceModule,
        AppToastModule,

        NgxUiLoaderModule, // import NgxUiLoaderModule
        NgxUiLoaderRouterModule,

        // import HttpClientModule
        NgxUiLoaderHttpModule,

        // NgxUiLoaderHttpModule.forRoot({ showForeground: true }),

        ConfirmDialogModule,
        DeclarationTableFormComponent,
        SkeletonModule,
        FormsModule,
        InputTextModule,
        AppCalendarModule,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'es-CL'},
        KeycloakService, // Ensure KeycloakService is provided
        {
            provide: HTTP_INTERCEPTORS,
            useClass: KeycloakInterceptor,
            multi: true
        },
        ConfirmationService,
        provideNgxMask(),
        {
            provide: ErrorHandler,
            useClass: ErrorHandlerService
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            multi: true,
            deps: [KeycloakService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
