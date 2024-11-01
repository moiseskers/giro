import {Pipe, PipeTransform} from '@angular/core';
import {ManagerTypeEnum} from "../../enums/manager-type.enum";

@Pipe({
    name: 'separationArray'
})
export class SeparationArrayPipe implements PipeTransform {

    constructor() {}

    transform(array: string[], separation: string): string {
        return array.map((v: string | number) => ManagerTypeEnum[v]  ).join(separation);
    }

}
