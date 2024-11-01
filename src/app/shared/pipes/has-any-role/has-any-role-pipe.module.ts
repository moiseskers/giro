import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HasAnyRolePipe} from "./has-any-role.pipe";

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [HasAnyRolePipe],
    declarations: [HasAnyRolePipe],
    providers: [],
})
export class HasAnyRolePipeModule {}
