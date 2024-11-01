import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {ErrorService} from "./error.service";
import {DefaultSystemMessagesService} from "../../shared/components/defaut-system-message-service";

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

    constructor(private injector: Injector,
                private logger: NGXLogger,
                private zone: NgZone) {
        super();
    }

    override handleError(error: any) {
        error = this.getRejectionIfPromiseBecomesRejected(error);
        const notifier = this.injector.get(DefaultSystemMessagesService);
        const errorService = this.injector.get(ErrorService);

        let messageToBePrinted: string;
        let stackTrace: string;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            messageToBePrinted = errorService.getServerMessage(error);

            this.zone.runTask(() => {
                if (this.httpRequestErrorToNotBePoppedUp(error)) {
                    notifier.error(messageToBePrinted);
                }
            });
        } else {
            // Client Error
            stackTrace = errorService.getClientStack(error) ?? `Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.`;
            messageToBePrinted = error?.message ? error?.message : `Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.`;

            this.zone.runTask(() => {
                if (this.clientErrorToNotBePoppedUp(error)) {
                    notifier.error(messageToBePrinted);
                }
            });
        }

        this.logger.error("error {}", error);
        this.logger.error('stack: {}', stackTrace);
    }

    // use this function in case you do not want to pop up the error
    private clientErrorToNotBePoppedUp(error: any) {
        let popUp: boolean = true;
        let expressionChangedAfterItHasBeenCheckedError = /ExpressionChangedAfterItHasBeenCheckedError/;
        if (expressionChangedAfterItHasBeenCheckedError.test(error?.message)) {
            popUp = false;
        }
        return popUp;
    }

    private httpRequestErrorToNotBePoppedUp(error: HttpErrorResponse) {
        let popUp: boolean = true;
        if (error.url.match(/saveuserinfo$/)) {
            return false;
        }
        return popUp;
    }

    private getRejectionIfPromiseBecomesRejected(error: any): any {
        return error?.rejection ?? error;
    }

}

