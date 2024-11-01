import {Component, Input, TemplateRef} from '@angular/core';

@Component({
    selector: 'app-default-center-grid',
    template: `
        <div class="">
            <div class="col-12 lg:col-8 lg:col-offset-2">
                <ng-container *ngTemplateOutlet="content"></ng-container>
            </div>
        </div>
    `
})
export class AppDefaultCenterGridComponent {

    @Input() content: TemplateRef<any>;

}
