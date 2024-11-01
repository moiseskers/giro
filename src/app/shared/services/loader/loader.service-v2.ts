import {Injectable} from '@angular/core';
import {LoaderType} from './loader.type';

/*
 * Example of usage
 * 1 - At the component constructor, declare the service:
 * constructor(public loaderService: LoaderServiceV2) {}
 *
 * 2 - Provide a constant `id`, or just pass it directly in the .html file, in some conditional true or false state:
 * <div *ngIf="this.loaderService.loading['someId']">
 *
 * 3 - At the component, make a call to some async function using the `activateLoader` method:
 * const model: Page<Model> = await this.loaderService.activateLoader(() => lastValueFrom(this.service.findById(id)), 'someId');
 *
 * 4 - Optionally, declare a variable in the TypeScript file to hold the loader ID:
 * serviceMethodLoaderId = 'service-method-loader-id';
 *
 * Note: Always declare this service as `public`.
 *
 * State Meanings:
 * - "0": Not used.
 * - "1": Used and loading.
 * - "2": Finalized (completed or failed).
 *
 * Important Note:
 * - Ensure that the `LoaderServiceV2` service is always declared as `public` in the component's constructor.
 *   This is necessary for Angular's dependency injection system to provide the service instance correctly.
 */
@Injectable({
    providedIn: 'root'
})
export class LoaderServiceV2 {

    // Use an object with a string index signature instead of an array
    public loading: { [key: string]: LoaderType } = {};

    /**
     * Activates a loader for the given `id` while the provided callback is being executed.
     *
     * @template T - The type of the value that the callback returns.
     * @param callback - A function that returns a promise. The loader will remain active until this promise is resolved or rejected.
     * @param id - A unique identifier for the loader. This allows tracking multiple loaders independently.
     * @returns The result of the callback function, wrapped in a promise.
     */
    async activateLoader<T>(callback: () => Promise<T>, id: string): Promise<T> {
        this.loading[id] = "1";
        console.log('Starting the callback',  this.loading[id]);
        try {
            const response = await callback();
            this.loading[id] = "2";
            console.log('Loader set to false success!');
            return response;
        } catch (e) {
            this.loading[id] = "2";
            console.log('Loader set to false error!');
            throw e;
        }
    }
}
