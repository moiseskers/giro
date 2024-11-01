import {NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {SeparationArrayPipe} from "./text-finder.pipe";

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [SeparationArrayPipe],
    declarations: [SeparationArrayPipe],
    providers: [TitleCasePipe],
})
export class SeparationArrayPipeModule {}
