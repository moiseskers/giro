import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, ViewChildren, WritableSignal} from '@angular/core';
import {Field, Filter} from './models/filter';
import {UntypedFormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {AppDynamicFormBuilderComponent} from '../app-dynamic-form-builder';
import {Table} from 'primeng/table';
import {SortMeta} from "primeng/api/sortmeta";
import {GeneralHelper} from "../../helpers/general-helper";


/**
 * @deprecated This class is deprecated. Use `AppFilterV2Component` instead.
 */
@Component({
    selector: 'app-filter',
    templateUrl: './app-filter.component.html',
    styleUrls: ['./app-filter.component.scss']
})
export class AppFilterComponent {

    @Input() filters: Filter[] = [];
    _filters: Filter[] = [];
    _baseFilter: Field;
    baseFilterFormControl: UntypedFormControl;
    loaded: boolean;
    queryParams: any;

    @ViewChildren('appDynamicFormBuilderComponentFilters') dynamicFormBuilderComponent: AppDynamicFormBuilderComponent[];
    @ViewChild('op') op: any;

    @Output() exportEvent = new EventEmitter();

    @Output() actionButtonEvent = new EventEmitter();

    public currentFilters: {};
    baseFilterLoaded: boolean;
    activatedFilters: any[] = [];

    @Output() filterEvent = new EventEmitter();
    @Input() table: Table;

    @Output() sortEvent = new EventEmitter();

    @Input() addButtonTitle: string;

    @Input() sortNewVersion: boolean;

    @Input() addButtonTitleDisable: boolean;
    @Output() clearFilterEvent = new EventEmitter();

    constructor(private datePipe: DatePipe, private cdr: ChangeDetectorRef) {}

    sortEventFunction($event: SortMeta[]) {
        if (this.sortNewVersion) {
            // new version
            const sortValues = $event.map(v => {
                const order = v.order == -1 ? 'desc' : 'asc'
                return `${v.field}.${order}`
            }).join(',');

            const sort = {
                sort: sortValues
            };

            this.sortEvent.emit(sort);
        } else {
            // old version
            this.sortEvent.emit($event);
        }
    }

    ngOnInit() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        this.queryParams = (Object as any).fromEntries((urlSearchParams as any).entries());
    }

    fromBase(): void {
        this.submit();
    }

    submit(): void {
        this.currentFilters = {};
        this.buildFromForm();
        this.buildFromBaseFilter();
        this.finalTap();
        this.mount(this.currentFilters);
        this.close();
    }

    ngAfterViewInit(): void {
        this._setUpBaseFilter(this.filters);
        const filters = this.filters.filter(value => !value?.base)
        this._setUpFilters(filters);
        this._mapAllActivatedFilters();
        this.cdr.detectChanges();
    }

    //fields
    sidebarVisible: boolean | WritableSignal<boolean>;

    @Input()
    addButtonLoading: boolean;

    _flatFieldsHelper(filters: Filter[]) {
        if (!GeneralHelper.isEmptyOrUndefinedOrNull(filters)) {
            return filters.map(value => value.fields).reduce((previousValue, currentValue) => {
                return [...previousValue, ...currentValue];
            }, []);
        }

        return []
    }

    ngDoCheck(): void {
        const flatFields = this._flatFieldsHelper(this.filters);
        const activatedFilters = [];
        if (flatFields) {
            flatFields.forEach(filter => {
                if (this.currentFilters) {
                    let currentFilter = this.currentFiltersHelper(filter?.name, filter.type);
                    if (currentFilter && currentFilter.trim() !== '') {
                        activatedFilters.push(filter);
                    }
                }
            });
        }
        this.activatedFilters = activatedFilters;
    }

    get invalid() {
       return this.dynamicFormBuilderComponent.some(value => value.form.invalid);
    }

    mount(output?: {}): void {
        Object.keys(output).forEach(value => {
            if (GeneralHelper.isEmptyOrUndefinedOrNull(output[value])) {
                delete output[value]
            }
        })
        this.filterEvent.emit(output);
    }

    clearOutside(): void {
        this.filters.forEach(parent => {
            parent.fields.forEach(child => {
                this.currentFilters[child.name] = undefined;
            });
        });

        this.finalTap();
        this.baseFilterFormControl.setValue('');
        this.mount(this.currentFilters);
        this.clearFilterEvent.emit();
    }

    // clearAll(): void {
    //     this.resetForm();
    //     this.baseFilterFormControl.setValue('');
    //     this.submit();
    // }

    resetForm() {
        this.dynamicFormBuilderComponent.forEach(value => {
            value.form.reset();
        });
    }

    baseFilterOutPut(): any {
        if (this.baseFilterLoaded) {
            return {
                [this._baseFilter.name]: this.filters.filter(value => value?.base)[0]?.fields[0]?.value?.trim()
            }
        }
        return {};
    }

    close() {
        this.sidebarVisible = false
        // this.op.hide();
    }

    value(value: any, item: Field): any {

        if (this.isDate(value)) {
            if (item?.config?.dataAndTime) {
                return this.datePipe.transform(value, 'dd/MM/yyyy HH:mm');
            }
            return this.datePipe.transform(value, 'dd/MM/yyyy');
        }

        if (item.type === 'dropdown') {
            return item?.options.filter((option: { key: any; }) => value === option.key)[0]?.label;
        }

        if (item.type === 'multiselect') {
            const stringSeparatedByComma = item.value.split(",");
            return stringSeparatedByComma.map((v1: string) => {
                return item.options.filter(v2 => v2.key === v1)[0]?.label
            }).join(', ');
        }

        return value;
    }

    isDate(value: any | any[]) {
        if (value instanceof Date) {
            return true;
        }
        return isNaN(Date.parse(value)) == false && value?.length > 23;
    }

    // removeFilter(item: any) {
    //     let flat: any = this.currentFilters;
    //     flat[item.name] = '';
    //     let flat2: any = this._flatFieldsHelper(this.filters);
    //     let deleteThisFilter = flat2.filter((value: { name: any; }) => value.name === item.name)[0];
    //
    //     this._baseFilter = this.filters.filter(value => value?.base)[0]?.fields[0];
    //
    //     if (this._baseFilter.name === item.name) {
    //         this.baseFilterFormControl.setValue('');
    //     } else {
    //         deleteThisFilter.value = '';
    //     }
    //     this.updateQueryParam(this.currentFilters)
    // }

    private _setUpFilters(filters: Filter[]) {
        const allFields = this._flatFieldsHelper(this.filters);
        Object.keys(this.queryParams).forEach(v => {
            allFields.filter(f => f.name === v).length > 0 ?
                allFields.filter(f => f.name === v)[0].value = this.queryParams[v] : ''
        });

        this._filters = filters;
        this.loaded = true;
    }

    private finalTap() {

        // remove unused filters and add reset paginator

        Object.keys(this.currentFilters).forEach(v => {
            if (this.currentFilters[v] instanceof Date) {
                this.currentFilters[v] = (JSON.stringify(this.currentFilters[v]) as any).replaceAll('"', '')
            }
            if (this.currentFilters[v]) {
                this.currentFilters[v] = (this.currentFilters[v] as string)?.trim();
            } else {
                this.currentFilters[v] = '';
            }
        });

        this.currentFilters = {
            ...this.currentFilters,
            ...{
                pageIndex: '1',
                itemsPerPage: '10'
            }
        }
    }

    private buildFromBaseFilter() {
        this.currentFilters = {...this.currentFilters, ...this.baseFilterOutPut()};
    }

    private buildFromForm() {
        this.dynamicFormBuilderComponent?.forEach(value => {
            value?.fields?.forEach(v => {
                Object.keys(value?.form?.value).forEach(v1 => {
                    if (v1 === v?.name) {
                        v.value = value?.form?.value[v1];
                    }
                });
            });
            this.currentFilters = {...this.currentFilters, ...value.form.value};
        });
    }

    private _setUpBaseFilter(filters: Filter[]) {
        this._baseFilter = filters.filter(value => value?.base)[0]?.fields[0];

        if (this._baseFilter) {
            this.baseFilterFormControl = new UntypedFormControl(this.queryParams[this._baseFilter.name] ?? null);

            this.baseFilterFormControl.valueChanges.subscribe(value => {
                filters.filter(value => value?.base)[0].fields[0].value = value;
            });

            this.baseFilterLoaded = true;
        }
    }

    private _mapAllActivatedFilters() {
        this.currentFilters = {...this.currentFilters, ...this.baseFilterOutPut()};
        let b = this._flatFieldsHelper(this._filters).filter(value => value?.value);
        b.forEach(v1 => {
            this.currentFilters = {...this.currentFilters, ...{[v1.name]: v1.value}};
        });
    }

    private currentFiltersHelper(name: string | undefined, type: string) {
        return this.currentFilters[name];
    }

    action() {
        this.actionButtonEvent.emit();
    }

    clearFields(): void {
        this.filters.filter(f => !f.base).forEach(f2 => {
                f2.fields.forEach(f3 => {
                    f3.value = undefined;
                });
            }
        );

        // this.filters.forEach(filter => {
        //         if (!filter.base) {
        //             filter.fields.forEach(value1 => {
        //                 value1.value = '';
        //             })
        //         }
        //     }
        // )
    }

}
