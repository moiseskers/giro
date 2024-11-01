import {Component, Input, TemplateRef} from '@angular/core';

@Component({
    selector: 'app-card',
    styleUrls: ['app-card.component.scss'],
    template: `
        <div class="card shadow-2 p-3" [ngClass]="styleClass">
            <div class="flex justify-content-between align-content-center ">
                <div>
                    <div class="app-card-header mb-3" *ngIf="cardTitle">
                        <span class="text-3xl font-semibold">{{cardTitle}}</span>
                    </div>
                    <ng-container *ngIf="subtitles.length > 0 || !subtitle">
                        <p class="card-subtitle" *ngFor="let item of subtitles">
                            {{item}}
                        </p>
                    </ng-container>
                    <ng-container *ngIf="subtitles.length == 0 || subtitle">
                        <p class="card-subtitle" *ngIf="subtitle">{{subtitle}}</p>
                    </ng-container>
                </div>

                <div class="align-self-center" >

                </div>
            </div>
            <ng-container *ngTemplateOutlet="content"></ng-container>
        </div>
    `
})
export class AppCardComponent {

    @Input() cardTitle: string;
    @Input() subtitle: string;
    @Input() subtitles: string[] = [];

    @Input() content: TemplateRef<any>;

    @Input()
    styleClass: string | string[] | Set<string> | { [p: string]: any } | null | undefined;
}
