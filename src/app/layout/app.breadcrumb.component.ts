import {Component} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {BreadcrumbService} from "../shared/services/breadcrumb";

export interface AppBreadcrumb {
    label: string;
    url?: string;
}

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent {

    private readonly _breadcrumbs$ = new BehaviorSubject<AppBreadcrumb[]>([]);
    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

    constructor(private router: Router, private breadcrumbService: BreadcrumbService) {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
            const root = this.router.routerState.snapshot.root;
            const breadcrumbs: AppBreadcrumb[] = [];
            this.addBreadcrumb(root, [], breadcrumbs);

            this._breadcrumbs$.next(breadcrumbs);

            this.breadcrumbService.breadcrumbsSource  = this._breadcrumbs$;
        });
    }

    private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: AppBreadcrumb[]) {
        const routeUrl = parentUrl.concat(route.url.map((url) => url.path));

        // Initially, take the breadcrumb label as is from the route data
        let breadcrumbLabel = route.data['breadcrumb'];

        // // Check if the breadcrumb label contains a placeholder
        // if (breadcrumbLabel && breadcrumbLabel.includes('{id}')) {
        //     // Replace the placeholder with the actual route parameter
        //     const actualId = route.params['id']; // This assumes 'id' is the name of your route parameter
        //     breadcrumbLabel = breadcrumbLabel.replace('{id}', actualId);
        // } else if (!breadcrumbLabel && route.params['id']) {
        //     // If there's no breadcrumb label but there is an 'id' param, use the 'id' as the label
        //     breadcrumbLabel = route.params['id'];
        // }

        const parentBreadcrumb = route.parent && route.parent.data ? route.parent.data['breadcrumb'] : null;

        if (breadcrumbLabel && breadcrumbLabel !== parentBreadcrumb) {
            breadcrumbs.push({
                label: breadcrumbLabel,
                url: '/' + routeUrl.join('/')
            });
        }

        if (route.firstChild) {
            this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
        }
    }
}
