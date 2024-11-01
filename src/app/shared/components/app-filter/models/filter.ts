export class Filter {
    constructor(
        public title?: string,
        public base?: boolean,
        public fields?: Field[],
    ) {
    }
}

export class Field {
    constructor(
        public id?: string,
        public type?: string,
        public name?: string,
        public term?: string,
        public label?: string,
        public placeholder?: string,
        public value?: any,
        public config?: any,
        public required?: boolean,
        public options?: Option[],
    ) {
    }
}

export class Option {
    constructor(public key?: string,
                public label?: string) {
    }
}
