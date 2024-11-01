import {NgModule} from '@angular/core';
import {LoaderService} from "./loader.service";
import {ToBooleanPipe} from "./to-boolean.pipe";

@NgModule({
    imports: [],
    exports: [ToBooleanPipe],
    declarations: [ToBooleanPipe],
    providers: [LoaderService],
})
export class LoaderServiceModule {
}
