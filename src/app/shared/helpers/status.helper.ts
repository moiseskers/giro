import {MenuItem} from "primeng/api";
import {OrganizationStatusEnum} from "../enums/organization-status-enum";
import {GeneralHelper} from "./general-helper";
import {BiddingStatus} from "../enums/bidding-status.enum";
import {ApplicationStatusEnum} from "../enums/application-status.enum";
import {DeclarationRequestStatus} from "../enums/declaration-request-status";
import {CigStatus} from "../enums/cig-status";
import {InvoiceStatus} from '../enums/invoice-status';
import {AddItemIfConditionHelper} from './add-item-if-condition.helper';

export class StatusHelper {


    public static invoiceStatus(status: InvoiceStatus): MenuItem[] {
        return [
                ...AddItemIfConditionHelper.execute(
                status === InvoiceStatus.PENDING,
                {
                    label: 'Aprobar',
                    id: GeneralHelper.getKeyByValue(InvoiceStatus, InvoiceStatus.APPROVED),
                },
            ),
            ...AddItemIfConditionHelper.execute(
                status === InvoiceStatus.PENDING,
                {
                    label: 'Rechazar',
                    id: GeneralHelper.getKeyByValue(InvoiceStatus, InvoiceStatus.REFUSED),
                }
            )
        ];
    }

    public static cigStatus(status: CigStatus): MenuItem[] {
        switch (status) {
            case CigStatus.ACTIVE:
                return [
                    {
                        label: `Desactivar`,
                        id: GeneralHelper.getKeyByValue(CigStatus, CigStatus.INACTIVE),
                    }
                ]
            case CigStatus.INACTIVE:
                return [
                    {
                        label: `Activar`,
                        id: GeneralHelper.getKeyByValue(CigStatus, CigStatus.ACTIVE),
                    },
                ]
        }
    }

    // Aprobar
    // Evaluación pendiente
    // Rechazar
    public static applications(status: ApplicationStatusEnum): MenuItem[] {
        let array: any = [
            {
                label: `Aprobar`,
                id: GeneralHelper.getKeyByValue(ApplicationStatusEnum, ApplicationStatusEnum.APPROVED),
            },
            {
                label: `Rechazar`,
                id: GeneralHelper.getKeyByValue(ApplicationStatusEnum, ApplicationStatusEnum.REFUSED),
            },
            {
                label: `Evaluación pendiente`,
                id: GeneralHelper.getKeyByValue(ApplicationStatusEnum, ApplicationStatusEnum.PENDING),
            },
        ];

        return array.filter((value: any) => ApplicationStatusEnum[value.id] !== status);
    }

    // Declarar adjudicada
    // Declarar desierta
    // Declarar cancelada
    public static bidding(status: BiddingStatus, hasEdit?: boolean): MenuItem[] {
        let array: any = [];

        if (hasEdit) {
            const edit = {
                label: `Editar`,
                id: 'EDIT',
            };
            array.push(edit);
        }

        switch (status) {
            case BiddingStatus.OPENED: // ABIERTO
                return [...array, ...
                    [
                        //     {
                        //     label: `Vigente`,
                        //     id: GeneralHelper.getKeyByValue(BiddingStatus, BiddingStatus.ACTIVATED),
                        // },
                        {
                            label: `Declarar cancelada`,
                            id: GeneralHelper.getKeyByValue(BiddingStatus, BiddingStatus.CANCELLED),
                        }
                    ]
                ]

            case BiddingStatus.ACTIVATED: // VIGENTE
                return [...array, ...
                    [
                        {
                            label: `Declarar cancelada`,
                            id: GeneralHelper.getKeyByValue(BiddingStatus, BiddingStatus.CANCELLED),
                        },
                        // {
                        //     label: `Cerrado`,
                        //     id: GeneralHelper.getKeyByValue(BiddingStatus, BiddingStatus.FINALIZED),
                        // },
                    ]
                ]

            case BiddingStatus.FINALIZED: // CERRADO
                return [...array, ...
                    [{
                        label: `Declarar adjudicada`,
                        id: GeneralHelper.getKeyByValue(BiddingStatus, BiddingStatus.AWARDED),
                    },
                        {
                            label: `Declarar desierta`,
                            id: GeneralHelper.getKeyByValue(BiddingStatus, BiddingStatus.ABANDONED),
                        },
                        {
                            label: `Declarar cancelada`,
                            id: GeneralHelper.getKeyByValue(BiddingStatus, BiddingStatus.CANCELLED),
                        }
                        // {
                        //     label: `Vigente`,
                        //     id: GeneralHelper.getKeyByValue(BiddingStatus, BiddingStatus.ACTIVATED),
                        // }
                    ]
                ]
        }
        return array;
    }

    public static organizations(status: OrganizationStatusEnum): MenuItem[] {
        switch (status) {
            case OrganizationStatusEnum.PENDING:
                return [{
                    label: `Activar`,
                    id: GeneralHelper.getKeyByValue(OrganizationStatusEnum, OrganizationStatusEnum.ACTIVE),
                },
                    {
                        label: `Rechazar`,
                        id: GeneralHelper.getKeyByValue(OrganizationStatusEnum, OrganizationStatusEnum.REFUSED),
                    }
                ]

            case OrganizationStatusEnum.REFUSED:
                // {
                //     label: `##`,
                //         id: GeneralHelper.getKeyByValue(OrganizationStatus, OrganizationStatus.PENDING)
                // },
                return [
                    {
                        label: `Activar`,
                        id: GeneralHelper.getKeyByValue(OrganizationStatusEnum, OrganizationStatusEnum.ACTIVE)
                    },
                ]

            case OrganizationStatusEnum.ACTIVE:
                return [{
                    label: `Desactivar`,
                    id: GeneralHelper.getKeyByValue(OrganizationStatusEnum, OrganizationStatusEnum.INACTIVE)
                }]

            case OrganizationStatusEnum.INACTIVE:
                return [{
                    label: `Activar`,
                    id: GeneralHelper.getKeyByValue(OrganizationStatusEnum, OrganizationStatusEnum.ACTIVE)
                }]
        }
    }

    public static mass(status: DeclarationRequestStatus, hasDownload?: boolean): MenuItem[] {
        let array: any = [];

        if (hasDownload) {
            const download = {
                label: `Descargar`,
                id: 'DOWNLOAD',
            };
            array.push(download);
        }

        switch (DeclarationRequestStatus[status]) {
            case DeclarationRequestStatus.COMPLETED:
            case DeclarationRequestStatus.ACTIVE:
                return [...array, ...[{
                    label: `Declarar bloqueada para declaraciones`,
                    id: GeneralHelper.getKeyByValue(DeclarationRequestStatus, DeclarationRequestStatus.BLOCKED),
                }]]

            case DeclarationRequestStatus.BLOCKED:
                return [
                    ...array, ...[{
                        label: `Declarar desbloqueada para declaraciones`,
                        id: GeneralHelper.getKeyByValue(DeclarationRequestStatus, DeclarationRequestStatus.ACTIVE),
                    }]
                ]
        }

        return array;
    }

    public static organizationChangeStatusesLabel(status: OrganizationStatusEnum, type: string): string {

        // filter
        if (type === 'FILTER') {
            return ''
        }

        if (type === 'CHANGE_STATUS') {
            // change status
            switch (status) {
                case OrganizationStatusEnum.ACTIVE:
                    return 'Activar'
                case OrganizationStatusEnum.INACTIVE:
                    return 'Desactivar'
                case OrganizationStatusEnum.PENDING:
                    return 'Aprobación pendiente'
                case OrganizationStatusEnum.REFUSED:
                    return 'Rechazar'
            }
        }
        return '';
    }

}
