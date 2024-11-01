import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppConfigModule} from 'src/app/layout/config/app.config.module';
import {PasswordModule} from 'primeng/password';
import {RippleModule} from "primeng/ripple";
import {AuthBasicLayoutComponent} from "../../components/auth-basic-layout/auth-basic-layout.component";
import {FocusFirstInvalidFieldModule} from "../../../shared/directives/focus-first-invalid-field";
import {FormErrorModule} from "../../../shared/components/form-error";
import {DividerModule} from "primeng/divider";

@NgModule({
    imports: [CommonModule, LoginRoutingModule, ButtonModule, InputTextModule, CheckboxModule, FormsModule, AppConfigModule, PasswordModule, RippleModule, AuthBasicLayoutComponent, FocusFirstInvalidFieldModule, FormErrorModule, ReactiveFormsModule, DividerModule],
    declarations: [LoginComponent]
})
export class LoginModule {
}
