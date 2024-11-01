import {Component} from '@angular/core';
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {LoaderService} from "../../../../../shared/services/loader";
import {lastValueFrom} from "rxjs";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {Page} from "../../../../../shared/objects/page";
import {ActivatedRoute, Router} from "@angular/router";
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";

@Component({
    selector: 'app-declaration-list-container',
    templateUrl: './declaration-list-container.component.html',
    styleUrl: './declaration-list-container.component.scss'
})
export class DeclarationListContainerComponent {

    declarations: Page<DeclarationResponseDto>;
    public readonly loaderId: string = UuidHelper.get();
    readonly viewPageUrl: string = `/private/admin/mass/pages/view/{0}/detail/{1}`;

    id: string = this.activatedRoute.snapshot.params['id'];

    filters: Filter[] = [
        {
            base: true,
            fields: [
                {
                    term: 'Buscar por ID de inscripción, razón social o RUT',
                    type: 'text',
                    name: 'search',
                    label: 'Buscar por ID de inscripción, razón social o RUT',
                },
            ]
        },
        {
            title: 'Fecha de declaración',
            fields: [
                {
                    term: 'Fecha de inscripción',
                    type: 'date',
                    name: 'declarationDateBegin',
                    label: 'Fecha de inscripción',
                    placeholder: '--/--/---- - --/--/----',
                    config: {
                        selectionMode: 'range'
                    },
                },
            ]
        },
        {
            title: 'Estado',
            fields: [
                {
                    term: 'Estado',
                    type: 'multiselect-checkbox',
                    name: 'status',
                    label: 'Estado',
                    // luquei aki, TODO add this endpoint >> /declarations-requests/type/{type}/filter-options
                    options: GeneralHelper.enumToList(DeclarationStatus, 'label', 'key').filter(value => DeclarationStatus[value.key] != DeclarationStatus.APPROVED )
                },
            ]
        },
    ];

    constructor(
        public loaderService: LoaderService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private service: DeclarationRequestService
    ) {

    }

    async ngOnInit() {
        this.declarations = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getDeclarations(this.id, null)), this.loaderId)
    }

    async viewEvent(id: string) {
        const url = GeneralHelper.formatString(this.viewPageUrl, this.id, id);
        await this.router.navigate([url]);
    }

    async filterProcess($event: any) {
        if ($event?.declarationDateBegin) {
            const declarationDateEnd = $event?.declarationDateBegin.split(',')[1];
            $event.declarationDateBegin = $event?.declarationDateBegin.split(',')[0];

            $event = {
                declarationDateEnd: declarationDateEnd,
                ...$event
            }
        }
        await this.filterEvent($event);
    }

    async sortEvent($event: any) {
        this.declarations = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getDeclarations(this.id, $event)), this.loaderId);
    }

    async filterEvent($event: any) {
        this.declarations = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getDeclarations(this.id, $event)), this.loaderId);
    }

    async pageEvent($event: any) {
        this.declarations = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getDeclarations(this.id, $event)), this.loaderId);
    }

}
