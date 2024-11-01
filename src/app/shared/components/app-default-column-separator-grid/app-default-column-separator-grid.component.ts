import {Component, Input, TemplateRef} from '@angular/core';

@Component({
    selector: 'app-default-column-separator-grid',
    template: `
      <div class="flex flex-column app-gap" *ngIf="content">
            <ng-container *ngTemplateOutlet="content"></ng-container>
      </div>
      
      <div class="flex flex-column app-gap" *ngIf="!content">
          <ng-content></ng-content>
      </div>
    `
})
export class AppDefaultColumnSeparatorGridComponent {

    @Input() content: TemplateRef<any>;

}
