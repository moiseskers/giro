import {ActivatedRoute, QueryParamsHandling, Router} from '@angular/router';
import {Injector} from '@angular/core';

interface Query {
    code: any;
    name: any;
    value: any;
}

class QueryParams {
    constructor(public url?: string,
                public params?: any,
                public queryParamsHandling?: QueryParamsHandling) {
    }
}

export class AppCrudListQueryParametersHelper {

    constructor(private injector: Injector) {
    }

    setQuery(_activatedRoute: ActivatedRoute, {
        params = {},
        queryParamsHandling = 'merge'
    }: QueryParams): ActivatedRoute {
        this.injector.get(Router).navigate([], {
            relativeTo: _activatedRoute,
            queryParams: params,
            queryParamsHandling: queryParamsHandling
        });
        return _activatedRoute;
    }

}
