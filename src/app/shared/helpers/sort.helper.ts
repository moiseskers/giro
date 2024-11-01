import {QueryParametersHelper} from './query-parameters.helper';
import {SortMeta} from "primeng/api/sortmeta";

class MultiSortMeta {
    constructor(public field: string, public order: number) {
    }
}

export class SortHelper {

    public static insertSortParamHelper(key: string, value: string, direction: string) {

        let searchParams = `?${window.location.search.substr(1)}`;

        let url = '';

        let newSort: string;

        if (SortHelper.hasQueryParamsHelper()) {
            newSort = `&sort=${value}.${direction}`;
            url = searchParams.concat(newSort);
        } else {
            newSort = `?sort=${value}.${direction}`;
            url = newSort;
        }

        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + url;
        window.history.pushState({path: newurl}, '', newurl);
    }

    public static getAllQueryParamsHelper(): any {
        const urlSearchParams = new URLSearchParams(window.location.search);
        // @ts-ignore
        return Object.fromEntries(urlSearchParams as any);
    }

    public static sort(multiSortMetas: MultiSortMeta[], callback?: Function) {
        SortHelper.removeAllSortsParamsAtCurrentUrl();

        multiSortMetas.forEach(value => {
            const direction = value?.order == 1 ? 'asc' : 'desc';
            this.insertSortParamHelper('sort', value.field, direction);
        });

        if (callback)
            callback();
    }

    public static removeAllSortsParamsAtCurrentUrl() {
        const currentUrlWithOutHash = window.location.origin + window.location.pathname + window.location.search;
        const urlWithSortsRemoved = QueryParametersHelper.removeURLParameter(currentUrlWithOutHash, 'sort');
        window.history.pushState({path: urlWithSortsRemoved}, '', urlWithSortsRemoved);
    }

    public static hasQueryParamsHelper() {
        return Object.keys(this.getAllQueryParamsHelper()).length > 0;
    }

    public static getSortObject(input: any) {
        input = Array.isArray(input) ? input[0] : input;
        const direction = input?.order == 1 ? 'asc' : 'desc';
        return {
            sort:`${input.field}.${direction}`
        }
    }

    public static sortObject($event: SortMeta, callback?: Function) {
        const modifiedEvent = this.getSortObject($event);
        if (callback)
            callback(modifiedEvent);
    }

}
