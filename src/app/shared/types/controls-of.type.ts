import {FormControl, FormGroup} from "@angular/forms";

export type ControlsOfType<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends Array<any>
        ? FormControl<T[K]>
        : T[K] extends Record<string, any>
            ? FormGroup<ControlsOfType<T[K]>>
            : FormControl<T[K]>;
};



