import {FieldBuilderType} from '../../app-dynamic-form-builder/models/field-builder.type';

export class FieldV2 {
    constructor(
        public type?: FieldBuilderType,
        public label?: string,
        public name?: string,
        public value?: any,
        public placeholder?: string,
        public required?: boolean,
        public disabled?: boolean,
        public readonly?: boolean,
        public maxlength?: number,
        public minlength?: number,
        public pattern?: string,
        public min?: number,
        public max?: number,
        public step?: number,
        public multiple?: boolean,
        public checked?: boolean,
        public accept?: string, // For file input
        public autocomplete?: string,
        public autofocus?: boolean,
        public list?: string, // For input with a datalist
        public maxLength?: number,
        public minLength?: number,
        public size?: number,
        public tabindex?: number,
        public options?: Map<string, string>,
        public id?: string,
        public base?: boolean,
    ) {
    }
}

