import {Component} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DatePipe} from "@angular/common";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    selector: 'app-warning-dialog-dialog',
    standalone: true,
    imports: [
        ButtonModule,
        DatePipe
    ],
    templateUrl: './warning-dialog.component.html',
    styleUrl: './warning-dialog.component.scss'
})
export class WarningDialogComponent {

    html: string;

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef) {
    }

    ngOnInit(): void {
        this.html = this.config.data.html;
    }

    cancel(): void {
        this.ref.close(false);
    }

    confirm(): void {
        this.ref.close(true);
    }

}
