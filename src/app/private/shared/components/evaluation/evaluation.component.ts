import {Component, Input} from '@angular/core';
import {ApplicationResponseDto} from "../../../../shared/models/application-response.dto";
import {EvaluationResponseDto} from "../../../../shared/models/evaluation-response.dto";
import {GiroDataViewComponent} from "../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-evaluation',
    templateUrl: './evaluation.component.html',
    styleUrl: './evaluation.component.scss',
    standalone: true,
    imports: [
        GiroDataViewComponent,
        DatePipe,
        NgForOf,
        NgIf
    ]
})
export class EvaluationComponent {

    public modelIn = (model: ApplicationResponseDto) => model;

    @Input()
    evaluations: EvaluationResponseDto[];

}
