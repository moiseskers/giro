import {Component, OnInit} from '@angular/core';
import {RoleService} from "../shared/services/role/role.service";
import {Role} from "../shared/enums/role";
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {AddItemIfConditionHelper} from '../shared/helpers/add-item-if-condition.helper';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(
        private router: Router,
        private log: NGXLogger,
        private roleService: RoleService) {
    }

    async ngOnInit() {
        this.changeMenu(this.roleService.getRoles());
        this.log.debug('starting app-menu component role logics ', this.roleService.getRoles());

        // this.profileService.getChangedProfile().subscribe(value => {
        //     this.changeMenu(value);
        // });
    }

    changeMenu(roles: string[]): void {
        this.checkRolesHelper(roles, [Role.MANAGER, Role.PRODUCER, Role.ADMIN, Role.CITY, Role.INDUSTRIAL_CONSUMER])

        // giro admin
        if (this.roleService.hasAnyRole([Role.ADMIN,
            Role.ADMIN_BIDDING,
            Role.ADMIN_DOMICILIARY,
            Role.ADMIN_NON_DOMICILIARY,
            Role.ADMIN_PRODUCER,], roles)) {
            this.roleAdminMenus(roles);
            return;
        }

        // giro manager
        if (this.roleService.hasAnyRole([Role.MANAGER], roles)) {
            this.roleManagerMenus(roles);
            return;
        }

        // giro producer
        if (this.roleService.hasAnyRole([Role.PRODUCER], roles)) {
            this.roleProducerMenus();
            return;
        }

        // giro industrial-consumer
        if (this.roleService.hasAnyRole([Role.INDUSTRIAL_CONSUMER], roles)) {
            this.roleIndustrialConsumerMenus();
            return;
        }

        // giro city
        if (this.roleService.hasAnyRole([Role.CITY], roles)) {
            this.roleCityMenus();
            return;
        }
    }

    roleAdminMenus(roles: string[]) {
        this.model = [
            ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([ Role.ADMIN, Role.ADMIN_BIDDING, Role.ADMIN_NON_DOMICILIARY, Role.ADMIN_PRODUCER], roles),
            {
                label: 'Entidades y usuarios',
                icon: 'pi pi-th-large',
                items: [
                    ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([Role.ADMIN, Role.ADMIN_BIDDING, Role.ADMIN_NON_DOMICILIARY, Role.ADMIN_PRODUCER], roles),
                    {
                        label: 'Entidades',
                        materialIcon: 'apartment',
                        routerLink: ['/private/admin/organization/pages']
                    }),
                    ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([ Role.ADMIN, Role.ADMIN_NON_DOMICILIARY,Role.ADMIN_PRODUCER], roles),
                    {
                        label: 'Usuarios',
                        materialIcon: 'account_circle',
                        routerLink: ['/private/admin/user/pages']
                    }),
                    ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([ Role.ADMIN, Role.ADMIN_NON_DOMICILIARY], roles),
                    {
                        label: 'CIG',
                        materialIcon: 'signature',
                        routerLink: ['/private/admin/cig/pages']
                    }),
                ]
            },
            {
                label: 'Reportes',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Panel de información GIRO',
                        materialIcon: 'dashboard',
                        routerLink: ['/private/admin/dashboard/pages']
                    },
                    {
                        label: 'Metas y toneladas',
                        materialIcon: 'donut_small',
                        routerLink: ['/private/admin/goals-tons/page']
                    },
                    {
                        label: 'Toneladas gestionadas en pátio trasero',
                        materialIcon: 'insert_chart_outlined',
                        routerLink: ['/private/admin/tons-managed/pages']
                    },
                ]
            },
            ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([Role.ADMIN, Role.ADMIN_BIDDING], roles),
            {
                label: 'Licitaciones',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Licitaciones',
                        materialIcon: 'description',
                        routerLink: ['/private/admin/bidding/pages']
                    },
                    {
                        label: 'Evaluación',
                        materialIcon: 'task',
                        routerLink: ['/private/admin/evaluation/pages']
                    }
                ]
            }),
            ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([Role.ADMIN, Role.ADMIN_DOMICILIARY, Role.ADMIN_NON_DOMICILIARY, Role.ADMIN_PRODUCER], roles),
            {
                label: 'Toneladas',
                items: [
                    ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([Role.ADMIN, Role.ADMIN_PRODUCER], roles),
                    {
                        label: 'Declaración de toneladas',
                        materialIcon: 'receipt',
                        routerLink: ['/private/admin/mass/pages']
                    }),
                    ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([Role.ADMIN, Role.ADMIN_NON_DOMICILIARY], roles),
                    {
                        label: 'Gestión de patio trasero',
                        materialIcon: 'pallet',
                        routerLink: ['/private/admin/backyard/pages']
                    }),
                    ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([Role.ADMIN, Role.ADMIN_DOMICILIARY], roles),
                    {
                        label: 'Facturas domiciliarias',
                        materialIcon: 'receipt_long',
                        routerLink: ['/private/admin/invoice/pages']
                    }),
                    ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([Role.ADMIN, Role.ADMIN_NON_DOMICILIARY, Role.ADMIN_DOMICILIARY], roles),
                    {
                        label: 'Stock',
                        materialIcon: 'shelves',
                        routerLink: ['/private/admin/stock/pages']
                    }),
                    ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([Role.ADMIN], roles),
                    {
                        label: 'Matching',
                        materialIcon: 'join_inner',
                        routerLink: ['/private/admin/matching/pages']
                    }),
                ]
            })),
            ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([Role.ADMIN, Role.ADMIN_PRODUCER], roles),
            {
                label: 'Informativos',
                items: [
                    ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([Role.ADMIN, Role.ADMIN_PRODUCER], roles),
                        {
                            label: 'Materiales',
                            materialIcon: 'file_present',
                            routerLink: ['/private/admin/materials/pages']
                        }),
                ]
            }),
        ];
    }

    roleManagerMenus(roles: string[]) {
        this.model = [
            ...AddItemIfConditionHelper.execute(this.roleService.hasAnyRole([
                    Role.MANAGER_PICKUP,
                    Role.MANAGER_PRETREATMENT,
                    Role.MANAGER_IRA_OPERATION,
                    Role.MANAGER_VALUER,
                    Role.MANAGER_NOT_HIRED,
                    Role.MANAGER_HIRED_BY_BIDDING,
                    Role.MANAGER_HIRED_BY_DIRECT_CONTRACT,
                    Role.MANAGER_HIRED_BY_BIDDING_AND_DIRECT_CONTRACT,
                ], roles),
                {
                    label: 'Base de licitaciones',
                    icon: 'pi pi-th-large',
                    items: [
                        {
                            label: 'Licitaciones',
                            materialIcon: 'description',
                            routerLink: ['/private/manager/bidding/pages']
                        },
                        {
                            label: 'Mis postulaciones',
                            materialIcon: 'description',
                            routerLink: ['/private/manager/applications/pages']
                        }
                    ]
                },
            ),
            {
                label: 'Toneladas',
                items: [
                    {
                        label: 'Gestión de patio trasero',
                        materialIcon: 'pallet',
                        routerLink: ['/private/manager/manager-backyard/pages']
                    },
                    ...AddItemIfConditionHelper.execute(
                        !this.roleService.hasAnyRole([Role.MANAGER_THIRD_PARTY], roles) && this.roleService.hasAnyRole([Role.MANAGER_VALUER], roles),
                        {
                            label: 'Facturas domiciliarias',
                            materialIcon: 'receipt_long',
                            routerLink: ['/private/manager/manager-invoice/pages']
                        },
                    )
                ]
            },

        ];
    }

    roleProducerMenus() {
        this.model = [
            {
                label: 'Reportes',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Panel de información GIRO',
                        materialIcon: 'dashboard',
                        routerLink: ['/private/producer/dashboard/pages']
                    },
                    {
                        label: 'Metas y toneladas',
                        materialIcon: 'donut_small',
                        routerLink: ['/private/producer/goals-tons/page']
                    },
                    {
                        label: 'Toneladas gestionadas en pátio trasero',
                        materialIcon: 'insert_chart_outlined',
                        routerLink: ['/private/producer/tons-managed/pages']
                    },
                ]
            },
            {
                label: 'Toneladas',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Declaración de toneladas',
                        materialIcon: 'receipt',
                        routerLink: ['/private/producer/mass/pages']
                    },
                ]
            },
            {
                label: 'Informativos',
                items: [
                    {
                        label: 'Materiales',
                        materialIcon: 'file_present',
                        routerLink: ['/private/producer/materials/pages']
                    },
                ]
            },
        ];
    }

    roleIndustrialConsumerMenus() {
        this.model = [
            {
                label: 'Toneladas',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Gestión de patio trasero',
                        materialIcon: 'pallet',
                        routerLink: ['/private/industrial-consumer/backyard/pages']
                    },
                ]
            },
            {
                label: 'Informativos',
                items: [
                    {
                        label: 'Materiales',
                        materialIcon: 'file_present',
                        routerLink: ['/private/industrial-consumer/materials/pages']
                    },
                ]
            },
        ];
    }

    roleCityMenus() {
        this.model = [];
    }

    checkRolesHelper(roleArray: string[], defaultRoles: string[]) {
        let counter = 0;

        for (let i = 0; i < roleArray.length; i++) {
            if (defaultRoles.filter(value => roleArray[i] === value).length > 0) {
                counter++;
            }
            if (counter > 1) {
                this.log.info('The role configurations are not set properly ', roleArray)
                this.router.navigate(['/error']);
            }
        }
    }
}
