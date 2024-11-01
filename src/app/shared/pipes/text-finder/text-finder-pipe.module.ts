import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextFinderPipe} from "./text-finder.pipe";

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [TextFinderPipe],
    declarations: [TextFinderPipe],
    providers: [],
})
export class TextFinderPipeModule {}
