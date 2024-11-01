import {Component, forwardRef, Input} from '@angular/core';
import {AppCalendarModule} from '../calendar/calendar';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {GeneralHelper} from '../../helpers/general-helper';
import moment from 'moment';

@Component({
    selector: 'app-year-picker',
    templateUrl: './year-picker.component.html',
    styleUrl: './year-picker.component.scss',
    standalone: true,
    imports: [
        AppCalendarModule,
        FormsModule
    ],
    providers:
        [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => YearPickerComponent),
                multi: true
            }
        ]
})
export class YearPickerComponent implements ControlValueAccessor {

    @Input()
    appendTo: string;

    input: any;

    registerOnChange(fn: string) {
        this.onChange = fn
    }

    registerOnTouched(fn: string) {
        this.onTouch = fn
    }

    onChange: any = () => {
    }

    onTouch: any = () => {
    }

    writeValue(obj: any): void {
        if (!GeneralHelper.isEmptyOrUndefinedOrNull(obj)) {
            if (this.isValidYearFromString(obj)) {
                const date = `${obj}-01-01`;
                this.input = moment(date).toDate();
                this.onChange(obj);
                this.onTouch(obj);
            }
        }
    }

    ngModelChange($event: Date) {
        this.onChange($event?.getFullYear()?.toString());
        this.onTouch($event?.getFullYear()?.toString());
    }

    isValidYearFromString(yearStr: string): boolean {
        // Define a valid year range
        const MIN_YEAR = 1900;
        const MAX_YEAR = 2100;

        // Try to parse the string as an integer
        const year = parseInt(yearStr, 10);

        // Check if the parsed value is a valid number and falls within the valid range
        return !isNaN(year) && year >= MIN_YEAR && year <= MAX_YEAR;
    }
}
