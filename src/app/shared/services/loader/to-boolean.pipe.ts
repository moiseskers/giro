import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'loaderHelper'
})
export class ToBooleanPipe implements PipeTransform {

    transform(input: any): boolean {
        // Check if the input is undefined or null
        if (input === undefined || input === null) {
            return false;
        }
        // If the input is anything other than false, return true
        return !input;
    }

}
