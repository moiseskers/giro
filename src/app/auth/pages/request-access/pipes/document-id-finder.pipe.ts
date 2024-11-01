import {Pipe, PipeTransform} from '@angular/core';

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
    name: 'documentIdFinder'
})
export class DocumentIdFinderPipe implements PipeTransform {

    constructor() {}

    transform(singleInput: string, inputs: any[]): boolean {
        return inputs.filter(input => singleInput === input.id).length !== 0;
    }

}
