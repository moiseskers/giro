export class QueryParametersHelper {

    public static removeURLParameter(url: any, parameter: any): string{

        // better to use l.search if you have a location/link object
        let urlParts = url.split('?');
        if (urlParts.length >= 2) {

            let prefix = encodeURIComponent(parameter) + '=';
            let pars = urlParts[1].split(/[&;]/g);

            // reverse iteration as may be destructive
            for (let i = pars.length; i-- > 0;) {
                //idiom for string.startsWith
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            url = urlParts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
            return url;
        } else {
            return url;
        }
    }

    public static insertParam(key: string, value: string) {
        if (history.pushState) {
            // let newurl = window.location.protocol + "//" + window.location.host + search.pathname + '?myNewUrlQuery=1';
            let currentUrlWithOutHash = window.location.origin + window.location.pathname + window.location.search;
            let hash = window.location.hash
            // remove any param for the same key
            currentUrlWithOutHash = QueryParametersHelper.removeURLParameter(currentUrlWithOutHash, key);

            // figure out if we need to add the param with a ? or a &
            let queryStart;
            if (currentUrlWithOutHash.indexOf('?') !== -1) {
                queryStart = '&';
            } else {
                queryStart = '?';
            }

            let newurl = currentUrlWithOutHash + queryStart + key + '=' + value + hash
            window.history.pushState({path: newurl}, '', newurl);
        }
    }

    public static removeAndUpdateParam(param: string) {
        if (history.pushState) {
            // let newurl = window.location.protocol + "//" + window.location.host + search.pathname + '?myNewUrlQuery=1';
            let currentUrlWithOutHash = window.location.origin + window.location.pathname + window.location.search;
            let hash = window.location.hash
            //remove any param for the same key
            currentUrlWithOutHash = QueryParametersHelper.removeURLParameter(currentUrlWithOutHash, param);

            // figure out if we need to add the param with a ? or a &
            let queryStart: any;

            if (currentUrlWithOutHash.indexOf('?') !== -1) {
                queryStart = '&';
            } else {
                queryStart = '?';
            }

            let newurl = currentUrlWithOutHash;

            window.history.pushState({path: newurl}, '', newurl);
        }
    }

}
