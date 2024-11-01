import {NgModule} from '@angular/core';
import {HasAnyRoleDirective} from './has-any-role.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [HasAnyRoleDirective],
    declarations: [HasAnyRoleDirective],
    providers: [],
})
export class HasAnyRoleModule {
}
