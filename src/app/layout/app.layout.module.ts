import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {SidebarModule} from 'primeng/sidebar';
import {BadgeModule} from 'primeng/badge';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
import {RippleModule} from 'primeng/ripple';
import {AppConfigModule} from './config/app.config.module';
import {AppLayoutComponent} from './app.layout.component';
import {AppBreadcrumbComponent} from './app.breadcrumb.component';
import {AppSidebarComponent} from './app.sidebar.component';
import {AppTopbarComponent} from './app.topbar.component';
import {AppProfileSidebarComponent} from './app.profilesidebar.component';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import {MenuModule} from "primeng/menu";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {AvatarModule} from "primeng/avatar";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {DividerModule} from "primeng/divider";
import {DropdownModule} from "primeng/dropdown";
import {FormErrorModule} from "../shared/components/form-error";
import {HasAnyRoleModule} from "../shared/directives/has-role/has-any-role.module";

@NgModule({
    declarations: [AppLayoutComponent, AppBreadcrumbComponent, AppSidebarComponent, AppTopbarComponent, AppProfileSidebarComponent, AppMenuComponent, AppMenuitemComponent],
    imports: [
        FormsModule,
        StyleClassModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        TooltipModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        ButtonModule,
        MenuModule,
        BreadcrumbModule,
        AvatarModule,

        BrowserAnimationsModule,
        OverlayPanelModule,
        DividerModule,
        DropdownModule,
        FormErrorModule,
        ReactiveFormsModule,
        HasAnyRoleModule,
    ]
})
export class AppLayoutModule {}
