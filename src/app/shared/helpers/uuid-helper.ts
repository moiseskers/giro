import {v4 as uuidv4} from 'uuid';

export class UuidHelper {

    public static get(): string {
        return uuidv4();
    }
}
