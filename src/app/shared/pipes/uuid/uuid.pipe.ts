import {Pipe, PipeTransform} from '@angular/core';
import {UuidHelper} from "../../helpers/uuid-helper";

// the purpose of this pipe is to provide a single input to match an array of inputs
// example 1:
// single input: 'RANCH'
// inputs array: ['RANCH', 'PARK', 'EXEMPTION']
// result: true

// example 2:
// single input: 'EXECUTE'
// inputs array: ['RANCH', 'PARK', 'EXEMPTION']
// result: false
@Pipe({
    name: 'uuid',
    standalone: true,
})
export class UuidPipe implements PipeTransform {

    constructor() {}

    transform(value: string): string {
        return UuidHelper.get();
    }

}
