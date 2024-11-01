import {Injectable} from '@angular/core';

/*
* Example of usage
* 1 - at the component constructor declare
* constructor(public loaderService: LoaderService) {}
*
* 2 - Provide a const id, or just pass it direct in .html file, in some conditional true or false state
* <div *ngIf="this.loaderService.loading['someId']">
*
* 3 - at the component make a call to some async function
* const model: Page<Model> = await this.loaderService.activateLoaderV2(() => lastValueFrom(this.service.findById(id)), 'someId');
* 4 - optional declare a variable in ts file: serviceMethodLoaderId = 'service-method-loader-id';
*
* 5 - a helper can be used to display or hide elements: *ngIf="!(loaderService.loading[this.serviceFilterOptionsLoaderId] | loaderHelper)"
*
* */
// DECLARE THIS SERVICE ALWAYS AS PUBLIC

/**
 * @deprecated This class is deprecated. Use `LoaderServiceV2` instead.
 */
@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    loading: boolean[] = [];

    async activateLoader<T>(callback: () => Promise<T>, id: string): Promise<T> {
        this.loading[id] = true;
        console.log('Starting the callback');
        try {
            const response = await callback();
            this.loading[id] = false;
            console.log('Loader set to false success!');
            return response;
        } catch (e) {
            this.loading[id] = false;
            console.log('Loader set to false error!');
            throw e;
        }
    }

    // is all not loading?
    public isAllNotLoading(): boolean {
        return this.loading.every(function(element) {
            return element === false;
        });
    }

}
