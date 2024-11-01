import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'loaderHelperV2'
})
export class ToBooleanV2Pipe implements PipeTransform {

    transform(input: any): boolean {
        if (input === undefined || input === null) {
            return false;
        }
        return input;
    }

}
