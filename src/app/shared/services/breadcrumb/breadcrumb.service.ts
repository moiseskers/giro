import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {AppBreadcrumb} from "../../../layout/app.breadcrumb.component";

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {

    public breadcrumbsSource = new BehaviorSubject<AppBreadcrumb[]>([]);

    updateBreadcrumbByUrl(url: string, newLabel: string) {
        const breadcrumbs: AppBreadcrumb[] = this.breadcrumbsSource.getValue()
        const breadcrumbIndex = breadcrumbs.findIndex(b => b.url === url);
        if (breadcrumbIndex !== -1) {
            breadcrumbs[breadcrumbIndex].label = newLabel;
            this.breadcrumbsSource.next(breadcrumbs);
        }
    }

}
