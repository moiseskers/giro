import {QueryParametersHelper} from './query-parameters.helper';

export class PaginatorHelper {

    // may be
    // {{page, size}}
    public static page($event: { [x: string]: any; }, callback?: Function) {
        Object.keys($event).forEach(value => {
            QueryParametersHelper.insertParam(value, $event[value]);
        });

        if (callback)
            callback();
    }

}
