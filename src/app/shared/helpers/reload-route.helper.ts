import {NavigationExtras, Router} from '@angular/router';

export class ReloadRouteHelper {

    /*
     * DO NOT FORGET TO ADD runGuardsAndResolvers: 'always', IN THE ROUTE YOU ARE GOING TO USE THIS HELPER
    */
    public static async reload(router: Router, commands: any[], extras?: NavigationExtras) {
        router.routeReuseStrategy.shouldReuseRoute = () => false;
        router.onSameUrlNavigation = 'reload';
        await router.navigate(commands, extras);
    }

}
