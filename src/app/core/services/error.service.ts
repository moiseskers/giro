import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getClientMessage(error: Error): string {
        if (!navigator?.onLine) {
            return 'Sem conexão com a internet';
        }
        return this.getErrorMessage(error);
    }

    getClientStack(error: Error): string {
        return error?.stack;
    }

    getServerMessage(error: HttpErrorResponse): string {
        if (error?.status != 500) {
            return error?.error?.message
                ? error?.error?.message
                : this.getDefaultErrorMessage(error?.status);
        }
        return this.getDefaultErrorMessage(error?.status);
    }

    getDefaultErrorMessage(status: number): string {
        return `Ocorreu um erro inesperado. Tente novamente mais tarde #${status}`;
    }

    private getErrorMessage(error: Error): string {
        if (error?.message) {
            return error.message;
        } else {
            return this.getDefaultErrorMessage(0);
        }
    }
}
