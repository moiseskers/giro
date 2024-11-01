import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {ToolbarModule} from "primeng/toolbar";
import {AppViewData} from "../app-view-data/app-view-data.component";


/**
 * @deprecated This class is deprecated. Use `GiroDataViewV2Component` instead.
 */
@Component({
    selector: 'app-giro-data-view',
    standalone: true,
    imports: [
        ButtonModule,
        NgTemplateOutlet,
        ToolbarModule,
        NgIf
    ],
    templateUrl: './giro-data-view.component.html',
    styleUrl: './giro-data-view.component.scss'
})
export class GiroDataViewComponent {

    @Output() actionEmitter = new EventEmitter();
    @Input() content: TemplateRef<any>;
    @Input() data: AppViewData[] = []

    @Input() aTitle: string = 'Title';
    @Input() buttonLabel: string;

    @Input()
    displayActionButton: boolean = true;

    @Input()
    displayActionButtonDisabled: boolean = false;

    action() {
        this.actionEmitter.emit();
    }
}
