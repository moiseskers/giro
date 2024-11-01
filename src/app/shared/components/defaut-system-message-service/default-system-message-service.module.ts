import {NgModule} from '@angular/core';

import {MessageService} from "primeng/api";
import {DefaultSystemMessagesService} from "./default-sytem-messages.service";

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [MessageService, DefaultSystemMessagesService],
})
export class DefaultSystemMessageServiceModule {
}
