import {Component} from '@angular/core';
import {Page} from "../../../../../shared/objects/page";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {ActivatedRoute, Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {NGXLogger} from 'ngx-logger';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';

@Component({
    selector: 'app-backyard-declaration-list-container',
    templateUrl: './backyard-declaration-list-container.component.html',
    styleUrl: './backyard-declaration-list-container.component.scss'
})
export class BackyardDeclarationListContainerComponent {

    declarations: Page<DeclarationResponseDto>;
    public readonly loaderId: string = UuidHelper.get();

    public readonly viewPageUrl: string = `${location.pathname}/detail/{0}`;
    id: string = this.activatedRoute.snapshot.params['id'];

    filters: Filter[] = []

    filterIsLoading: boolean = true;

    declarationFilterLoaderId: string = UuidHelper.get();

    constructor(
        public loaderServiceV2: LoaderServiceV2,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private service: DeclarationRequestService,
        private log: NGXLogger,
    ) {
    }

    async ngOnInit() {
        this.declarations = await this.loaderServiceV2.activateLoader(() => lastValueFrom(this.service.getDeclarations(this.id, null)), this.loaderId);
        await this.initializeFiltersLoaded();
    }

    private async initializeFiltersLoaded() {
        let options: any;

        try {
            options = await this.loaderServiceV2.activateLoader(() => lastValueFrom(this.service.filtersDeclaration(this.id)), this.declarationFilterLoaderId);
        } catch (e)  {
            this.log.info(e)
        }

        const status = options?.status || [];

        this.filters =  [
            {
                base: true,
                fields: [
                    {
                        term: 'Buscar por ID de declaración, razón social, RUT o identificación (ID)',
                        type: 'text',
                        name: 'search',
                        label: 'Buscar por ID de declaración, razón social, RUT o identificación (ID)',
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
                        options: status.map((s: any) => {
                                return {
                                    key: s,
                                    label: DeclarationStatus[s]
                                }
                            }
                        )
                    },
                ]
            },
        ];

        this.filterIsLoading = false;
    }

    async viewEvent(id: string) {
        const url = GeneralHelper.formatString(this.viewPageUrl, id);
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
        this.declarations = await this.loaderServiceV2.activateLoader(() => lastValueFrom(this.service.getDeclarations(this.id, $event)), this.loaderId);
    }

    async filterEvent($event: any) {
        this.declarations = await this.loaderServiceV2.activateLoader(() => lastValueFrom(this.service.getDeclarations(this.id, $event)), this.loaderId);
    }

    async pageEvent($event: any) {
        this.declarations = await this.loaderServiceV2.activateLoader(() => lastValueFrom(this.service.getDeclarations(this.id, $event)), this.loaderId);
    }

}
