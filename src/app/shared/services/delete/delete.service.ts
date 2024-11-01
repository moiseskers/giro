import {Injectable} from '@angular/core';
import {ConfirmationService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class DeleteService {

    constructor(private confirmationService: ConfirmationService) {}

    confirmationDialog(
        {
            message = 'Tem certeza que deseja remover esse registro?',
            header = 'Confirmar Eliminación',
            acceptLabel = 'Confirmar',
            rejectLabel = 'Cancelar',
            icon = 'pi pi-info-circle'
        }:
            { message?: string; header?: string; acceptLabel?: string; rejectLabel?: string; icon?: string; rejectVisible?: boolean } = {}
    ): Promise<void> {
        return new Promise((resolve) => {
            this.confirmationService.confirm({
                message: message,
                header: header,
                acceptLabel: acceptLabel,
                rejectLabel: rejectLabel,
                icon: icon,
                accept: () => {
                    resolve();
                },
            });
        });
    }

    public removeById(list: any[], id: any) {
        for (let i = 0; i < list.length; i++) {
            if (list[i]?.id === id) {
                list.splice(i, 1);
            }
        }
    }

}
