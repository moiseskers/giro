import {QueryParametersHelper} from './query-parameters.helper';

export class FilterHelper {

    public static filter($event: any, callback?: Function) {
        const url = new URL(window.location.href);
        url.search = '';
        window.history.replaceState({}, document.title, url.toString());

        Object.keys($event).forEach(value => {
            if ($event[value]) {
                $event[value] = encodeURIComponent($event[value]);
                QueryParametersHelper.insertParam(value, $event[value]);
            } else {
                QueryParametersHelper.removeAndUpdateParam(value);
            }
        });
        if (callback)
            callback();
    }


    public static filterRangeDate(fullFilterObject: any, startDateFieldName: string, endDateFieldName: string): any {
        if (fullFilterObject?.[startDateFieldName]) {
            const initialDateEnd = fullFilterObject?.[startDateFieldName].split(',')[1];
            fullFilterObject[startDateFieldName] = fullFilterObject?.[startDateFieldName].split(',')[0];

            fullFilterObject = {
                [endDateFieldName]: initialDateEnd,
                ...fullFilterObject
            }

            return fullFilterObject;
        }
        return fullFilterObject;
    }

}
