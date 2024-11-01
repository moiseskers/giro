import {Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {ToolbarModule} from "primeng/toolbar";
import {AppViewData} from "../app-view-data/app-view-data.component";
import {PrimeTemplate} from 'primeng/api';
import {Nullable} from 'primeng/ts-helpers';

@Component({
    selector: 'app-giro-data-view-v2',
    standalone: true,
    imports: [ButtonModule, NgTemplateOutlet, ToolbarModule, NgIf],
    templateUrl: './giro-data-view-v2.component.html',
    styleUrl: './giro-data-view-v2.component.scss'
})
export class GiroDataViewV2Component {

    @Output() actionEmitter = new EventEmitter();
    @Input() data: AppViewData[] = []

    @Input() aTitle: string = 'Title';
    @Input() buttonLabel: string;

    @Input()
    displayActionButton: boolean = true;

    @Input()
    displayActionButtonDisabled: boolean = false;

    toolbarTemplate:  Nullable<TemplateRef<any>>;
    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    ngAfterContentInit(): void {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'toolbar-content':
                    this.toolbarTemplate = item.template;
                    break;
            }
        });
    }


    action() {
        this.actionEmitter.emit();
    }
}
