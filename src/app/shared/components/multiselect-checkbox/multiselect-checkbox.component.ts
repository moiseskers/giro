import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-multiselect-checkbox',
    standalone: true,
    imports: [
        CheckboxModule,
        FormsModule,
        NgIf,
        NgForOf
    ],
    templateUrl: './multiselect-checkbox.component.html',
    styleUrl: './multiselect-checkbox.component.scss',
    providers:
        [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MultiselectCheckboxComponent),
                multi: true
            },
        ]
})
export class MultiselectCheckboxComponent implements ControlValueAccessor {

    // array of options
    @Input()
    options: any[] = [];

    @Input()
    optionLabel: string;

    @Input()
    optionValue: string;

    @Input()
    placeholder: string;

    value: any;
    checked: any[];



    //map output
    set amount(value: any) {
        if (value !== undefined && this.amount !== value) {
            this.value = value
            this.onChange(value)
            this.onTouch(value)
        }
    }

    onChange: any = () => {
    }

    onTouch: any = () => {
    }

    ngOnInit(): void {
        // get all options
        this.checked = Array(this.options.length).fill(undefined);

        // this.ngControl = this.injector.get(NgControl);
    }

    registerOnChange(fn: any) {
        this.onChange = fn
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn
    }

    writeValue(obj: any): void {

    }

    ngModelChange($event: any) {
        const output = this.checked
            .filter(value => !(value === undefined || value === null || value === ''))
            .flatMap(value => value);

        this.onChange(output);
        this.onTouch(output);
    }

}
