import {Component} from '@angular/core';

@Component({
    selector: 'app-steps',
    templateUrl: './steps.component.html',
    styleUrl: './steps.component.scss'
})
export class StepsComponent {

    items = [
        {

            label: 'Datos del gestor',
            routerLink: '/auth/request-access/steps/1'
        },
        {
            label: 'Datos de la empresa',
            routerLink: '/auth/request-access/steps/2'
        },
        {
            label: 'Documentos',
            routerLink: '/auth/request-access/steps/3'
        }
    ];

}
