import moment from 'moment';
import {DeclarationStatus} from '../../../../shared/enums/declaration-status';
import {DeclarationRequestRecurrence} from '../../../../shared/enums/declaration-request-recurrence';

export class ProducerDeclarationHelper {

    public static displayModal(status: DeclarationStatus,
                               endDate: string | Date,
                               declarationRequestRecurrence: DeclarationRequestRecurrence): boolean {
        const today = moment();
        const check = ProducerDeclarationHelper.isDateLessThan(today, moment(endDate))
        return check
            &&
            status === DeclarationStatus.FINALIZED
            &&
            declarationRequestRecurrence === DeclarationRequestRecurrence.MONTHLY;
    }

    public static isDateLessThan(date1Str: any, date2Str: any) {
        const date1 = moment(date1Str).startOf('day');
        const date2 = moment(date2Str).startOf('day');
        return date1.isAfter(date2);
    }

}
