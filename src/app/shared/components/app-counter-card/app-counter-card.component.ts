import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
    selector: 'app-counter-card',
    styleUrls: ['app-counter-card.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        NgForOf,
        NgTemplateOutlet
    ],
    template: `
        <div class="card" [ngClass]="styleClass">
            <div class="flex justify-content-between align-content-center">
                <div class="app-card-header mb-3" *ngIf="cardTitle">
                    <span class="text-3xl font-semibold">{{ cardTitle }}</span>
                </div>
            </div>
            
            <ng-container>
                {{description}}
            </ng-container>
        </div>
    `
})
export class AppCounterCardComponent {

    @Input() cardTitle: string;

    @Input() description: any;

    @Input()
    styleClass: string | string[] | Set<string> | { [p: string]: any } | null | undefined;
}
