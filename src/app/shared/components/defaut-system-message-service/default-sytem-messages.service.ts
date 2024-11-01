import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Message} from 'primeng/api/message';

@Injectable()
export class DefaultSystemMessagesService {

    constructor(private messageService: MessageService) {}

    success(message: string = 'Operación realizada con éxito', life?: number): any {
        this.messageService.add({severity: 'success', summary: 'Éxito', detail: message, life:  life ?? 2000});
    }

    custom(message: Message): any {
        this.messageService.add(message);
    }

    error(message: string = 'Ha ocurrido un error, inténtalo de nuevo más tarde'): any {
        try {
            this.messageService.add({severity: 'error', summary: 'Error en el sistema', detail: message, closable: true, life: 7000});
        }catch (e) {
            this.messageService.add({severity: 'error', summary: 'Error en el sistema', detail: message, closable: true, life: 7000});
        }
    }

    info(message: string = 'Ha ocurrido un error, inténtalo de nuevo más tarde'): any {
        this.messageService.add({severity: 'info', summary: 'Atención', detail: message});
    }
}
